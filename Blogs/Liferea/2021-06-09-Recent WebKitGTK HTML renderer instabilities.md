---
title: Recent WebKitGTK HTML renderer instabilities
---

In recent weeks there are more issues with the WebKitGTK HTML renderer
widget used by Liferea. Here is some insight on these problems and if you
are impacted how to workaround...

## 1. Broken/missing CSS

When you upgrade your install WebkitGTK library to version 2.32 or newer
CSS decorations in Liferea will vanish. This is due to new and more strict
security settings of Webkit.

CSS styles are properly applied again starting with Liferea 1.13.5.

**Impact**: Happens to all users once upgrading to WebKitGTK 2.23+

**Workaround:** Upgrade to Liferea 1.13.5 or downgrade WebKitGTK

## 2. Crashes/flickering upon video playback

It seems that the Webkit rendering process dies if the gstreamer library
crashes in background. When this happens you see the HTML widget go blank
or sometimes do flicker for 2-3 seconds before going blank. In all those case
a video playback was started, which often is an video auto-play of the visited
website and causes a crash in gstreamer.

**Impact:** Affects not all users, quite rare

**Workaround:** Disable Javascript in the preference to prevent automatic video playback.
