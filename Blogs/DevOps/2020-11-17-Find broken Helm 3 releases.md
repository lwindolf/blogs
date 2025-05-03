---
title: Find broken Helm3 releases
categories: Helm
---

With Helm3 find releases in unexpected state:

     helm ls -A -o json | jq  -r '.[] | select(.status != "deployed") | .name'
