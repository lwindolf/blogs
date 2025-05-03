---
title: Helm Best Practices
categories: [Helm, kubernetes]
---
As a reminder to myself I have compiled this list of opinionated
best practices (in no particalur order) to follow when using Helm
seriously:

## General

- Do not try to mix Helm2 and Helm3
- Do not use Helm3 yet (as of 02/2020) as infrastructure as
  code tools do not support it yet
- When using Openshift start with Helm3 only to avoid to many
  workarounds

## Deployment

- Before deployment check for and fix all releases in FAILED state
- After deployment check for releases in FAILED state
- Consider using `--atomic` when installing/upgrading charts to
  get automatic rollback on failures
- Consider using `--kubeconfig` or `--kube-ctxt` to 100% ensure
  to hit the correct k8s cluster
- Deploy your chart releases declaratively (infrastructure as code) using a tool like [helmfile](https://github.com/roboll/helmfile) or [terraform](https://www.terraform.io/docs/providers/helm/index.html)
- Perform deployment using a docker image with all the infrastructure as code tooling you required. Use this tooling also when running test deployments from your laptop.
- Wisely choose the [proper Helm version](/blog/Helm+causes+Could+not+get+apiVersions+from+Kubernetes) and pin it in your CI/deployment tooling image.
- Helm2: Actively check if the k8s cluster has the correct Helm version
- Be careful will CRD installing charts. As resource application is asynchronous per default, any installed CRD might not become visible immediately and subsequent dependant charts might fail. This happens with cert-manager for example. As a safe workaround have a layered infrastructure as code setup where in a first step all CRDs are applied and only later all dependant chart releases are applied.

## IAM 

- When using kube2iam annotate all namespaces you create with a
  role whitelisting pattern/definition. Use the namespace config
  chart mentioned above to do so. This prevents erroneous or evil
  pod IAM annotations to become effective.

## Monitoring / Testing

- Check for releases in FAILED state
- Always use periodic `helm diff` or `helmfile diff` to monitor your cluster for unapplied changes
- Run both upgrade and fresh install tests of your helm chart releases
- Be careful with waiting for Helm releases to be finished before
  running checks.

## Troubleshooting

- When everything is stuck remove the chart with `helm delete --purge <chart release>`
  and reinstall it. Without `--purge` a new installation might fail

## Secrets

- From the start use the [helm secrets](https://github.com/futuresimple/helm-secrets) plugin to provide encrypted secrets using CI

## Configuration

- Alway run your deployment from a clean `~/.helm` setup. Otherwise it might be affected by other repo settings. Use a pre-build docker image to ensure a clean environment.
- For reproducibility: always overwrite the chart `image:` value to an image archived on your own chart repository
- For reproducibility: pin chart releases to exact versions
- For reproducibility and release management: isolate the version definitions into a per cluster/stage separate YAML config (aka release descriptor)
- Use a generic chart for namespace configuration (quotas, security settings...). For example [https://github.com/zloeber/helm-namespace](https://github.com/zloeber/helm-namespace)
- Separate values.yaml from release declarations
- From the beginning start using configuration environments. Either using the infrastructure as code tools support e.g. helmfile or by creating a directory layout matching your environments and manually select values.yaml it when applying releases.

## Repos

- Declare your repos using an infrastructure as code tool (see above)
- Do not use the legacy chart repo anymore
- For reproducibility: Host your own repository with an archive of all
  chart versions you ever used (chartmuseum, Nexus, jFrog artifactory will do)

## When writing charts

- Never hardcode the namespace
- Write a good output template
- Use `helm lint` to check your results
- Use `helm install --debug --dry-run ./<chart>` for template rendering output by tiller
- Use `helm template ./<chart>` for local template rendering output


That's all for now. If this list did help you or not, or you want 
to add points consider writing a comment!

Also check out the [Helm cheat sheet](/cheat-sheet/Helm)!
