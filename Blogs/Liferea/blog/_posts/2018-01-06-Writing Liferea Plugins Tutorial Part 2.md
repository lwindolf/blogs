---
title: Liferea Plugins Tutorial Part 2
---

Let's continue the plugin tutorial! The last <a href="https://lzone.de/liferea/blog/Writing+Liferea+Plugins+Tutorial+Part+1">installement</a> was on how plugins work and how to create the boilerplate for a new plugin. Now let's look into how to access Liferea UI elements and how to modify them.

## Accessing UI elements

Using the plugin boilerplate for a Liferea.ShellActivatable (a plugin that activates once the Liferea shell, which as an object comprises the entire main window UI, has been setup) we get a member variable named `shell`

    shell = GObject.property (type=Liferea.Shell)

which can be used to look up GTK objects by name using

    shell.lookup(<some name>)

Some interesting names to look up are:

<table border='1'>
<tr>
<th>Name</th>
<th>Description</th>
</tr>
<tr><td>mainwindow</td><td>The main GtkWindow</td></tr>
<tr><td>leftpane</td><td>The vertical pane containing the feed list</td></tr>
<tr><td>rightpane</td><td>The vertical pane containing the rest</td></tr>
<tr><td>feedlist</td><td>The feed list GtkTreeView</td></tr>
<tr><td>itemlist</td><td>The item list GtkTreeView</td></tr>
<tr><td>browsertabs</td><td>The tabs notebook of the item view</td></tr>
<tr><td>statusbar</td><td>The main window status bar</td></tr>
</table>

This list not being exhaustive you can grep the code for more uses

    rgrep liferea_shell_lookup src/

in general when you want to modify existing UI elements or add extra elements to the UI above list should be a good start.

## Example: Modifying the feed list

Here is a simple example to hide the 2nd column of the feed list GtkTreeView. To do this we use the `shell` member to look up the `feedlist` GtkTreeView and ask it for the 2nd column which we then hide:

    from gi.repository import GObject, Peas, PeasGtk, Gtk, Liferea, Gdk

    class NrColumnHidePlugin (GObject.Object, Liferea.ShellActivatable):
        __gtype_name__ = 'NrColumnHidePlugin'

        object = GObject.property (type=GObject.Object)
        shell = GObject.property (type=Liferea.Shell)

        def do_activate (self):
            treeview = self.shell.lookup ("feedlist")
            column = Gtk.TreeView.get_column (treeview, 1)
            Gtk.TreeViewColumn.set_visible (column, 0);

        def do_deactivate (self):
            return

This is all done on activate, nothing needs to be done on deactivation.

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
