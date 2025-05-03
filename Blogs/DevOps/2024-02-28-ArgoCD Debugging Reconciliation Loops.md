This is post to document a somewhat troublesome ArgoCD performance optimization result I experienced.

## How to analyze high CPU usage

Suddenly (maybe after installing a shiny new operator) ArgoCD gets very slow. You notice
the GUI taking forever when hitting refresh and syncs you start are timing out. Once you look at the 
ArgoCD pods there are three possible candidates for performance bottlenecks

- application controller
- server
- repo server

So the first issue is: are you spending enough on resources / concurrency?

## Determine scaling issues

Things are differently for the ArgoCD application controller compared to server and repo server. The latter
two can be scaled by having more of them. So spend some CPUs and scale out and they should be fine.

The controller is different and can only be scaled vertically. Don't be confused by the "sharding" feature
as it is only sharding for multiple k8s clusters (so 1 shard for each cluster). If you have only one cluster
you cannot shard.

So if your application controller is CPU bound try throwing CPUs at it. Next watch the reconciliation 
activity graph in your monitoring dashboard. If it keeps growing the more CPUs you are providing you have found 
a reconciliation loop. Quite a lot of users seem to suffering from it...

## Debugging reconciliation loops

Maybe "loop" is the wrong word. If you are suffering from this then when you check your application
controller you will find an endless stream of

     level=info msg="Reconcilation completed" application=<some application>

messages. Probably multiple times per minute. If you see this then one or more of the k8s resources
in the applications namespace trigger ArgoCD to start checking stuff continuously. All CPUs you throw
at it will get eaten up. Instead of wasting CPUs you want ArgoCD to not react to those "hidden" updates.
And this is actually possible...

To analyze the root cause follow the instructions in [Reconcile Optimization](https://argo-cd.readthedocs.io/en/stable/operator-manual/reconcile/).
Basically set the application controller log level to `debug` and watch out for line like those

    level=debug msg="Requesting app refresh caused by object update" ... api-version=autoscaling/v2 ... kind=HorizontalPodAutoscaler

The `api-version` and `kind` fields will give you the causing resource types. Next you can perform the
resource update ignore configuration as documented in the above link. If you are lucky your CPU usage
will significantly drop to a reasonable amount as stuff gets only updated on real changes in Git or
by real modifications in k8s.

## The problem with orphaned resources

If you are unlucky you might notice that **your ignore definitions are ignored**! The cause for this seems
to be a [problematic behaviour](https://github.com/argoproj/argo-cd/issues/15594) of ArgoCD which does treat 
managed resources differently from so called "orphaned" (means unmanaged) resources. Ignore rules simply do 
not work for "orphaned" resources.

You can check for this effect indirectly using the ArgoCD application controller at log level `debug`.
Verify for each of your resource update ignore rules if you find a log line like

    level=debug msg="Ignoring change of object because none of the watched resource fields have changed" ... api-version=<group> ... kind=<resource>

If you do not find it you know the ignore rule is being ignored because the resource in question is an orphaned 
resource which you can verify by checking the resource for missing ArgoCD instance metadata labels.

To sum it up: with the current ArgoCD releases if you have a reconciliation loop on "orphaned" resources 
**you are stuck with wasting CPU cycles**!

## What causes orphaned resources?

Those are usually causes by operators. You usually rollout the operator CRD using ArgoCD, so the namespace
is ArgoCD managed and watched for changes. But then the operator independantly creates resources and if those 
happen to update some annotations or metadata (in my case a Postgres cluster operator every 10s adding a connection status in `.metadata.annotations.status`)
you get an unfixable reconciliation loop. 

The only way is to get the software/operator to stop updating the status fields or at least to do it much
much more rarely because it will always trigger an ArgoCD reconciliation.

## Possible Workaround

If your operator (or any other mechanism creating those "orphaned" resources) allows some templating where
you can specify the metadata of the resources that are created then you are in luck. In this case extend
the metadata spec by the typical ArgoCD labels and ArgoCD despite not having created those resources will
apply the ignore rules, because it now deems those resources as "managed".
