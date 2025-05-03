If you upgrade pygobject 3.52.3 you might see <a href="https://github.com/lwindolf/liferea/issues/1425">Liferea stopping to work</a> due to a plugin issue.  As I understand it so far this is not a Liferea problem
and it affects all GTK/GNOME apps using the libpeas 1.0 library together with pygobject 3.52.3.

Other affected applications are: Rhythmbox, gedit, eog, xed, totem (<a href="https://gitlab.archlinux.org/archlinux/packaging/packages/pygobject/-/issues/3">details</a>).

## Workaround

You have to downgrade pygobject to 3.50 using you distro mechanisms.

## How will this be fixed?

It seems unclear how this will play out

1. pygobject reverting the change
2. distros staying at pygobject 3.50.x

**There is nothing applications can do** besides porting to GTK4, which for Liferea is underway, 
but will take a while.

