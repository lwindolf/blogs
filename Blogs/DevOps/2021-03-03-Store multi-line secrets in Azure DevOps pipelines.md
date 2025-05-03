---
title: Store multi-line secrets in Azure DevOps Pipeline Libraries
---

Azure DevOps wants you to provide secrets to pipelines using a so called
`pipeline library`. You can store single line strings as `secrets` in the
pipeline library. You cannot though store multi-line strings as `secrets`
without messing up the line-breaks.

## Storing multi-line secrets as "Secret Files"

If you need a multi-line secret (e.g. an SSH private key or a kubectl
context) you need to provide this secret as a `secret file`. When you
open the library click the 2nd tab 'Secret Files' and upload your secret.

When accessing secrets and secret files via variable in the pipeline
there is no difference in using the secret variable!
