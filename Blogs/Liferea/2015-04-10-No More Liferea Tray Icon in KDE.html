With bug report <a href="https://sourceforge.net/p/liferea/bugs/1118/">SF #1118</a> Mike Robinson reported the tray icon not working on KUbuntu. Quote:

<pre>I'm using version 1.8.10 on Kubuntu and the "Integrate with the 
messaging menu" doesn't cause the program to appear in the KDE 
system tray. When I click to close the application, I can see that it 
is still running in the background, and when I try to re-open it, it 
immediately pops up the window. I would assume that it is trying to 
integrate itself into a non-existent Gnome system tray instead of 
playing nice with KDE. I feel having this is essential to KDE users.</pre>

And he is right, as reported in other locations too (e.g. Redhat ticket <a href="https://bugzilla.redhat.com/show_bug.cgi?id=716358">#716358</a>) it turns out that using <a href="">GtkStatusIcon</a> (the long needed EggTrayIcon replacement introduced in GTK+ 2.10) breaks the tray icon in KDE.

As explained in the Redhat ticket Ubuntu and KDE boldly went ahead an implemented a new XEmbed specification, while GNOME/GTK (and GtkStatusIcon used by Liferea) stayed with the old. While KDE tries to be backwards compatible it still fail with sizing issues. This is known for many different applications with tray icons. 

For Liferea we intentionally leave all the complexity to the GtkTrayIcon widget implementation by GTK. There is no other portable way to do it right in GTK+ AFAIK.

And yes, <b>effectively this means you cannot use the tray icon with recent KDE versions</b>. For Ubuntu itself Liferea has libindicate support solving the issue there.
