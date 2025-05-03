---
title: Liferea Plugins Tutorial Part 1
---

Some time ago a fellow Liferea user asked about documentation on writing Liferea plugins. I see the need and the benefit and want to start doing so with a series of blog posts that later can be compiled into a tutorial to be included on the website/sources.

## Plugins with GObject Introspection

First it is important to know that Liferea 1.10+ uses <a href="https://wiki.gnome.org/action/show/Projects/GObjectIntrospection?action=show&redirect=GObjectIntrospection">GObject Introspection</a> (GI) and <a href="https://developer.gnome.org/libpeas/stable/">libpeas</a> to allow implementing plugins. This quote from the <a href="https://wiki.gnome.org/action/show/Projects/GObjectIntrospection?action=show&redirect=GObjectIntrospection">GNOME wiki</a> explain how GI works:

<i><quote>GObject introspection is a middleware layer between C libraries (using GObject) and language bindings. The C library can be scanned at compile time and generate a metadata file, in addition to the actual native C library. Then at runtime, language bindings can read this metadata and automatically provide bindings to call into the C library. </quote></i>

The important point is: by Liferea using GI (as all GNOME applications and many other GTK applications do now) plugins can be written in practically <b>any scripting language</b>. Most users seem to favour Python and all current plugins included with the Liferea sources are in Python. Note that this tutorial will also focus on Python only.

## How are plugins triggered from within Liferea?

Ok, I can write a script in Python! How will Liferea run it and when?

This is where libpeas comes in, which is a basic library to implement a plugin system. If you click the preferences dialog and switch to the "Plugins" button you see a dialog provided by the <a href="https://developer.gnome.org/libpeas/stable/PeasGtkPluginManager.html">PeasGtkPluginsManager</a> class of libpeas. Detection, activation and configuration of plugins is handled by libpeas.

<img src='/liferea/blog/assets/preferences-plugins.png'/>

Now for the "When?" question: To properly allow applications to hook plugins into different parts of the applications libpeas allow an application to define one or more so called "Activatable" interfaces.

For simplicity for Liferea I decided to only support a LifereaShellActivatable interface. This means all plugins are activated together with the LifereaShell instance (`src/ui/liferea_shell.c`). This class represents the main application window holding all widgets. So when your plugin gets activated all widgets exist and you can access everything like extending or modifying the GUI, changing settings, everything you can think of.

Note: in the code there are two more interfaces:

- LifereaAuthActivatable
- LifereaMediaPlayerActivatable

that are used to implement two important features (GNOME keyring support and a simple media player). Feel free to use those two, but be aware that they work differently and activate at other times and not just once as the `LifereaShellActivatable`.

## Using LifereaShellActivatable

If you script in Python using `LifereaShellActivatable` means simply deriving a new class from it. For example:

    from gi.repository import GObject, Peas, PeasGtk, Gtk, Liferea, Gdk
    
    class ExamplePlugin (GObject.Object, Liferea.ShellActivatable):
        __gtype_name__ = 'ExamplePlugin'

        object = GObject.property (type=GObject.Object)
        shell = GObject.property (type=Liferea.Shell)

        def do_activate (self):
            # Do something here...

        def do_deactivate (self):
            # Maybe do somethin here too...

The `activate()` and `deactivate()` methods are required by libpeas and provide you with the starting points to do stuff. By fetching the `Liferea.Shell` instance you gain access to the main window. Using this you can both lookup widgets or other Liferea classes like the Liferea.FeedList to perform actions against business objects of Liferea.

## Providing a plugin configuration

Along with the actual plugin code libpeas requires a plugin configuration file defining the language the plugin is implemented with and metadata (name, description, website...) for this plugin. Such a file looks like this:

    [Plugin]
    Module=example
    Loader=python3
    IAge=2
    Name=Example Plugin
    Description=Illustrates how to implement plugins in Liferea
    Authors=Lars Windolf <lars.windolf@gmx.de>
    Copyright=Copyright © 2014 Lars Windolf
    Website=https://lzone.de/liferea/
    Help=https://lzone.de/liferea/

Most important is the `Loader` setting indicating the correct scripting language and 
the `Module` setting which together with the `Loader` setting as `python3` indicates 
that our plugin script is to be named "example.py". Both the "example.py" plugin script 
and its `example.plugin` config file needs to be put into the Liferea plugins directory...

## Where to put my plugin script?

There are two possible locations for the plugin script (and it's configuration file):

- For user provided plugins: usually `~/.local/share/liferea/plugins`
- For distro package provided plugins: usually `/usr/lib/liferea/plugins`

Note that paths can be different with different XDG settings.

When writing and testing don't bother installing the plugin in the package directories. Just put it in `~/.config/liferea/plugins` and fire up Liferea.

<hr/>

More about how to check for activation, debug problems and handling enabling/disabling in the next installment of this tutorial!

## Related

Also check out the other plugin tutorial posts

<ul>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-1">Plugin Tutorial Part 1</a> (Plugin Boiler Plate)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-2">Plugin Tutorial Part 2</a> (Acessing and modify UI elements)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-3">Plugin Tutorial Part 3</a> (Adding menu elements)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-4">Plugin Tutorial Part 4</a> (Using GTK inspector)</li>
<li><a href="/liferea/blog/Writing-Liferea-Plugins-Tutorial-Part-5">Plugin Tutorial Part 5</a> (Enabling translations for plugins)</li>
</ul>