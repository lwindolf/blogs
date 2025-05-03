---
layout: post
title:  "Helm Checking Keys"
date:   2019-07-03 22:23:13 +0200
categories: Helm
---
It is quite impressive how hard it is to check a map key in Go templates to
do some simple if conditions in your Helm charts or other kubernetes templates. 

At least for Helm there is a nice solution. For this you have to know that
Helm uses the Sprig template library which has support for [dict](https://github.com/Masterminds/sprig/blob/master/dict.go) types. And the `dict` type provides a `hasKey` method:

    {{ "{{" }}- if hasKey .Values.mymap "mykey" }}
        # do something conditional here...
    {{ "{{" }}- end }}

You might also want to check the [Helm Templates Cheat Sheet](/cheat-sheet/Helm+Templates)
