---
title: Liferea Plugins Tutorial Part 5
---

This tutorial part is about how to localize core Python plugins so
contributors can translate the user interface.

## Enable gettext for Python Plugins

For a good plugin example have a look at the Liferea plugins
<a href="https://github.com/lwindolf/liferea/blob/master/plugins/headerbar.py#L30">headerbar.py</a>
where Robbie Cooper added gettext support.

To do so add this code in global scope:

    # Initialize translations for tooltips
    # Fallback to English if gettext module can't find the translations
    # (That's possible if they are installed in a nontraditional dir)
    import gettext
    _ = lambda x: x
    try:
        t = gettext.translation("liferea")
    except FileNotFoundError:
        pass
    else:
        _ = t.gettext

And now everywhere you need it you can use translated literals, e.g.

    button.set_tooltip_text(_("Previous Item"))

Note the `_()` style which is the gettext wrapper to replace text with
translations.

<hr/>

## Related

Also check out the other plugin tutorial posts

<ul>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-1">Plugin Tutorial Part 1</a> (Plugin Boiler Plate)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-2">Plugin Tutorial Part 2</a> (Acessing and modify UI elements)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-3">Plugin Tutorial Part 3</a> (Adding menu elements)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-4">Plugin Tutorial Part 4</a> (Using GTK inspector)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-5">Plugin Tutorial Part 5</a> (Enabling translations for plugins)</li>
</ul>

