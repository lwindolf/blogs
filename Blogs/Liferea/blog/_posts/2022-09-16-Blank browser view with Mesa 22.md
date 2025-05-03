When you upgrade to Mesa 22 and run on an Intel Iris graphic card you 
can run into a bug that suddenly no headline content is rendered anymore.
This bug seems to be in WebkitGtk 4.0 up to 2.36: [https://bugs.webkit.org/show_bug.cgi?id=238513](https://bugs.webkit.org/show_bug.cgi?id=238513) 
and probably will be solved in an upcoming WebkitGtk release.

## Workaround

As a workaround set the environment variable `WEBKIT_DISABLE_COMPOSITING_MODE=1`
e.g. in your `~/.profile`. Alternatively downgrade Mesa.

