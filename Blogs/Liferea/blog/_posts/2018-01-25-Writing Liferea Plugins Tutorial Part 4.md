---
title: Liferea Plugins Tutorial Part 4
---

Here is another How-To on GTK/libpeas plugin development. This time it is on
how to use the <a rel="nofollow" href="https://blogs.gnome.org/mclasen/2014/05/15/introducing-gtkinspector/">GTK Inspector</a>
 to dive into application details.

## How to enable GTK Inspector

Before we can start we have to enable the GTK inspector with 

    gsettings set org.gtk.Settings.Debug enable-inspector-keybinding true

Now with any GTK application you can open the GTK inspector by pressing
either `Ctrl-Shift-I` or `Ctrl-Shift-D`. If this doesn't help try launching with

    GTK_DEBUG=interactive liferea

## Discovering widget names with GTK Inspector

When you have successfully launched the inspector you should see a window like this:

<img src='/images/liferea-gtk-inspector.png'/>

Note the second column `Name` in the `Objects` tab containing all those widget
names we covered in part 2+3 of this tutorial.

## Trying GTK CSS styles

If you select the `CSS` tab you get a inline editor to try style changes in
Liferea. If you make modifications successfully you can save them to disk
and make them permanent.

For quick effect try entering

    treeview {
      background-color:red;
    }

    button {
      font-size: 200%
    }

and notice the immediate changes.

To address widgets by name ensure to always prefix the widget type selector.
For example to change the `itemlist` treeview do

    treeview#itemlist {
      background-color:green;
    }

and not just (as one would in HTML)

    #itemlist {
      background-color:green;
    }

You probably also noticed that widget type names are not `GtkTreeView` but
`treeview`, not `GtkButton` but `button` and so on. Just lowercase and strip
`Gtk` and you have the selector name.

## Experiment with GTK settings

Finally check out the `Visual` tab which exposes all major GTK settings on a
per application basis. Here you can try fonts, theme setting, dark variant...

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
