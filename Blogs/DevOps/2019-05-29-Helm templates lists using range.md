---
categories: Helm
---
When you write a Helm template and want to create a list using range use the following syntax

    ---
    spec:
      something:
        myList:
        {{ "{{" }}- range .Values.myList }}
        {{ "{{" }} print "- " (. | quote) }}
        {{ "{{" }}- end }}

The thing to know is that "." accesses the current element in the list and the `print "- "` in front makes it a list item.
