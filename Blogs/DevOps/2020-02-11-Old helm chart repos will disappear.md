---
categories: [Helm, kubernetes]
---
The old github based [Helm chart repository](https://github.com/helm/charts)
is going to be deprecated soon and charts might be vanishing depending how this goes.

Quoting [this Reddit comment](https://www.reddit.com/r/kubernetes/comments/f1rnn4/helmstable_is_going_away_now_what/):

- May 13, 2020 At 6 months – when helm v2 goes security fix only – the stable and incubator repos will be de-listed from the Helm Hub. Chart OWNERS are encouraged to accept security fixes only
- Nov 13, 2020 At 1 year, support for this project will formally end, and this repo will be marked obsolete

## The Problem

Like with using dockerhub images, using Helm charts either from
hub.helm.sh or from https://github.com/helm/charts is not safe in
terms of reproducibility. Both the docker images the charts rely
on as well as the chart definitions themselves might be unavailable
at any time.

As with a vanishing docker image, your running deployments/pods
won't be affected at all once a chart is not available anymore.

## The Solution

Same solution as with using external docker images that you have
to archive and only use via your own docker registry. Each chart
you use you have to keep in a chart repository of your own.

So if you do not have one set up a helm chart repository like

- chartmuseum
- jFrog artifactory
- Nexus
...

and backup all charts you currently use.

Also have a look at the list of [Helm best practices](/blog/Helm+Best+Practices)
