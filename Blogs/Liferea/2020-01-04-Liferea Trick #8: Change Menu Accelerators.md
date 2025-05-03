When you are not satisfied with the menu key bindings defined by Liferea do not despair it is easy to change them!

This trick is valid for Liferea versions 1.12 to 1.15.

## Edit Accels Plugin

There is a plugin by frequent Liferea contributor Mozbugbox allowing you to change keybindings. It is not installed
per-default, so install it via `Tools` -> `Plugin Installer`. In the plugin preferences click `Dump Accels` to create
a key binding file.

![Screencast of accels dump via plugin](/liferea/blog/assets/dump-accels-howto.gif)

Open the keybinding file in `~/.local/share/liferea/plugins/accels/accels.txt` in your 
favourite editor. This file will be now be read upon Liferea startup to set key bindings 
and contains lines like these:

    [...]
    # ["app.next-read-item", []]
    ["app.next-unread-item", ["<Primary>n"]]
    # ["app.open-item-enclosure", []]
    # ["app.open-link-in-browser", []]
    [...]


Note how only `app.next-unread-item` has a defined key binding `Ctrl-N` and for 
example `app.next-read-item` has none.

To change a key binding:
      
- First remove any '#' at the start of the line 
- Then enter a valid key binding. Choose prefixes like `<Primary>` (for Ctrl), `<Alt>`, `<Shift>` as needed and append the key after it.
- Ensure the key binding you defined is not used elsewhere in the file

## Recent Liferea Tricks

- [#1: Middle Mouse Button](/liferea/blog/Liferea-Trick-1-Middle-Mouse-Button-Clicking.html)
- [#2: Drag and Drop URLs](/liferea/blog/Liferea-Trick-2-Drag-and-Drop-URLs.html)
- [#3: Feed Auto Discovery](/liferea/blog/Liferea-Trick-3-Use-Feed-Auto-Discovery.html)
- [#4: Full Screen](/liferea/blog/Liferea-Trick-4-Full-Screen-Mode.html)
- [#5: Privacy with SOCKS Proxy](/liferea/blog/Liferea-Trick-5-Privacy-with-a-SOCKS-Proxy.html)
- [#6: Website Scraping](/liferea/blog/Liferea-Trick-6-Website-Scraping.html)
- [#7: Force Read Full Posts](/liferea/blog/Liferea-Trick-7-Force-Read-Full-Posts.html)
- [#8: Change Menu Accelerators](/liferea/blog/Liferea-Trick-8-Change-Menu-Accelerators.html)
- [#9: Skimming Through the Headlines](/liferea/blog/Liferea-Trick-9-Skimming-Through-the-Headlines.html)
- [#10: Custom CSS for Article Rendering](/liferea/blog/Liferea-Trick-10-Custom-CSS-for-Article-Rendering.html)

