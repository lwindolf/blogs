---
title: 'The perfect headerbar, or: Where to place the reader mode button?'
---

## Status of the headerbar plugin

All through the 1.12 release line we had a headerbar plugin that allowed you to
switch from using classic menubar/toolbar to a headerbar. While not everyone likes
the headerbar (and it's obligatory "hamburger" menu) it is undisputable that it saves
precious vertical space, is touch friendly and can prominently put the most important
actions as buttons or search fields.

With 1.13 it is probably time to drop menubar/toolbar in favour of a headerbar only
layout. If you feel strongly against this please leave a comment, so far quite a lot
of Liferea users did choose to enable the headerbar.

## Current UX design problem: enable/disable 'Reader Mode'

I believe one of the most important features in 1.13 is the so called 'Reader Mode'
that you might know from your favourite browser. Pioneered by Opera, nowadays Chrome, 
Firefox, Edge and others all support clicking a document icon (usually appearing to the right
inside the URL entry) to switch to an visually uncluttered content view optimal for reading.

Liferea 1.13 also introduces this feature to be used together with the HTML5 extraction
feature where website contents are directly extracted to provide more content for your
headlines. As this also extracts a lot of page structure that might cause wierd vertical
empty spaces, useless bullet lists without any content, awefully broken social media 
buttons, and so on... it is good to have 'Reader Mode' (powered by Readability.js) to
strip them.

But due the _heuristics nature_ of Readability.js sometimes small pieces of content
might be deemed as non-content and end up being stripped. To ensure you are in
control the 'Reader Mode' needs a UI element enabling/disabling it.

## Possible UI solutions

Leaving aside wether 'Reader Mode' should be Opt-In or Opt-Out we do we place the button?

The following place inside Liferea come to mind

1. Inside the HTML rendering of the headline (some inline Javascript link)
   probably near the title
2. A new button in the header bar (to the right, so it is above the headline)
3. In an extra menu bar above the headline (which we do not have yet)
4. As with major browsers inside some type of URL entry field (which we do not have yet)

First let's summarize some obvious problems

- Option #3 and #4 waste extra vertical space, which is precious
- Option #2 will cause visual disturbance when switching between feeds
  (especially when reading when selecting a folder, as different headlines
   will have different 'Reader Mode' state and cause a button state change)
- Option #1 introduces a settings element inside the content view, which 
  introduces visual clutter and might balance badly against the favicon
  
Thinking about why the delayed appearance of the reader mode icon in web browsers doesn't disturb 
me I guess it is because typical web browser eye focus is to the left upper corner of the HTML view
while the icon is far to the right in the URL bar, so it appearing doesn't disturb focus.

This is different in Liferea with it content focus being in the second half of the window with+
the 'Reader Mode' indicator right above it.

## Opt-In Alternatives

Given the above disadvantages: what about not having a GUI element but an Opt-In property? Opt-In
could happen in two places

1. Global preferences: Check box to have 'Reader Mode' on/off for all HTML5 extraction headlines
2. Per-feed property: Check box to have 'Reader Mode' on/off for this feed online

## What do you think?

I'm currently not sure how to go about this, so please leave comments (Disqus) about what would be your choice
or any alternatives this post has not covered!

Thanks a lot!
