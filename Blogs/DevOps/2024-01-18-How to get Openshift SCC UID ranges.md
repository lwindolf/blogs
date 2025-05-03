A typical problem when using Helm charts in Openshift is handling security context UID ranges.
As Helm charts are usually targeting kubernetes they do not force you to set the proper 
security context.

Once you apply the Helm chart you immediately get an error from the admission controller about invalid
UIDs in the pods you deploy. For example

    unable to validate against any security context constraint: [provider restricted: .spec.securityContext.fsGroup: Invalid value: []int64{999}: 999 is not an allowed group spec.containers[0].securityContext.runAsUser: Invalid value: 999: must be in the ranges: [1000640000, 1000649999]]",

Now if you have a Helm chart that allows to specify the security context constraint you can take
the UID range reported from the error message and pass it in the values file. But how about
programmatically doing this?

## Query Openshift namespace UID ranges

UID ranges are defined per namespace in the namespace annotation. You can query it like this

    oc get project -o jsonpath="{.metadata.annotations.openshift\.io/sa\.scc\.uid-range}"

which for above error example would return `1000640000/10000` which gives you the minimum 
id of `1000640000` and the info that `10000` more ids can be allocated.

## Helm Magic to translate ids

Usually default ids provided by Helm charts lie in the range around `1000` which would make it
easy to just add those to the base id (like `1000640000`). As of now I do not know whether Helm
has a mechanism to apply the translation. It would be great to have such a business logic
for example using a user id template helper which detects Openshift and performs the mapping.
