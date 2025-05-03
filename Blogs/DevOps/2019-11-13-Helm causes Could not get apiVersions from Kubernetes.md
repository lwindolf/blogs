---
layout: post
title:  "Helm causes 'Could not get apiVersions from Kubernetes'"
categories: Helm
---
When using Helm > 2.14.3 you can suddenly end up with

    Could not get apiVersions from Kubernetes: unable to retrieve the complete list of server APIs

errors when handling (installing, upgrading, removing) helm charts that use CRDs.

The (working) solution according to [https://github.com/jetstack/cert-manager/issues/2273](https://github.com/jetstack/cert-manager/issues/2273)
is to downgrade Helm to version 2.14.3.

Also note the relative low quality of recent 2.x Helm versions with severe bugs near
2.14.3. In my experience 2.14.0, 2.14.1 and 2.14.2 are unusable due to a [resource
merging bug](https://github.com/helm/helm/issues/5750). While release 2.15.0 is
unusable due to an [integer enumeration bug](https://github.com/istio/istio/issues/18172).

So far I believe it is safe to stay with 2.14.3
