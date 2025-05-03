---
categories: Jekyll
---
When providing this blog with some custom CSS to better format
code examples I had troubles applying several of the online suggestions
on how to add custom CSS in a Jekyll setup with Minima theme active.

## Problem: Finding the right theme file to overrule

So the issue was the for the popular Jekyll theme "Minima" there were
different solutions telling to modify files like

- _includes/minima/custom.scss
- assets/minima/styles.scss
- assets/main.scsss

and so on. The problem is that different Minima versions did use 
different paths internally and when overriding the rules you need
to choose the right path.

## Solution: Find the right file path to overrule

The way to go is to check your generated HTML for the asset name.
For example run

    grep "stylesheet.*css" _site/index.html

In my case I got

    <link rel="stylesheet" href="/blog/assets/main.css">

and with "/blog" being my base URL I knew I needed to supply
the file `assets/main.scss`.

## Do proper style inheritance

Now when writing `assets/main.scss` it is necessary to source the
active theme. The best way is to do it by using templating for the
theme name and not hard-coding it as in `@import "minima"`. This
way it might magically work once you decide to switch your theme:

    ---
    ---
    
    @import "{{ "{{" }} site.theme }}";

Below this header you can add additional CSS rules as you like!

    
