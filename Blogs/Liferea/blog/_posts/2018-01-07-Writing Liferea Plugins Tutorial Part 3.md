---
title: Liferea Plugins Tutorial Part 3
---

Welcome to a new installment of the plugins tutorial! Todays issue will cover menu modifications. This allows you to add new menu options for features you introduce with your plugin.

## Extending a menu in PyGI

Now how do we extend a Liferea menu? First we get the menu from the GtkBuilder:

    self.menu = self.shell.get_property("builder").get_object("tools_menu")

Now we can append a new menu action:

    toolsmenu.append ('Menu Entry Title', 'app.MyPluginMenuEntry')

Finally we have to create an action matching `app.MyPluginMenuEntry`:

    action = Gio.SimpleAction.new ('MyPluginMenuEntry', None)
    action.connect("activate", self._menu_callback)

    self._app = Liferea.Shell.get_window().get_application ()
    self._app.add_action (action)

## Available Menus

You probably noticed the `ToolsMenu` and `MainwindowMenubar` ids in the XML snippet above. Here is a list of all menu ids in 1.14 which also can be found in <a rel="nofollow" href="https://github.com/lwindolf/liferea/blob/liferea-1_14/glade/liferea_menu.ui">glade/liferea_menu.ui</a>.

<table border="1">
<thead><tr>
<th>submenu id</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr><td>feed_menu</td><td>All actions regarding subscriptions and the feed list</td></tr>
<tr><td>item_menu</td><td>All actions regarding the item list</td></tr>
<tr><td>view_menu</td><td>All actions controlling reading layout</td></tr>
<tr><td>tools_menu</td><td>The menu to access preferences and update status</td></tr>
<tr><td>help_menu</td><td>The place to go for help</td></tr>
</tbody>
</table>

## Complete Solution

Everything put together in a plugin could look like this:

    import gi

    gi.require_version('Gtk', '3.0')

    from gi.repository import GObject, Liferea, Gtk

    class AppActivatable(GObject.Object, Liferea.ShellActivatable):
        __gtype_name__ = "MyPluginAppActivatable"

        shell = GObject.property(type=Liferea.Shell)

        def __init__(self):
            GObject.Object.__init__(self)

        def do_activate(self):
            action = Gio.SimpleAction.new ('InstallPlugins', None)
            action.connect("activate", self._run)

            self._app = self.shell.get_window().get_application ()
            self._app.add_action (action)

            toolsmenu = self.shell.get_property("builder").get_object ("tools_menu")
            toolsmenu.append (_('Plugins'), 'app.InstallPlugins')
            
        def do_deactivate(self):
            self._browser = None
            self._app.remove_action ('InstallPlugins')
            self.app = None

    def _run(self, action, data=None):
            print("Menu action triggered")

For a real world example have a look at <a rel="nofollow" href="https://github.com/lwindolf/liferea/blob/master/plugins/plugin-installer.py">https://github.com/lwindolf/liferea/blob/master/plugins/plugin-installer.py</a>

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
