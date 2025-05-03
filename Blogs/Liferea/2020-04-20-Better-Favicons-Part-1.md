One known issue in Lifera v1.12 is the low resolution of favicons
when using the 3-pane wide view mode. In this mode favicons are displayed
larger to give a visual counter weight to the text excerpts shown below the headline.

## A first improvement

Soon the following quite simple improvement will land in master:

![3-pane wide view mode favicons with higher resolution](assets/favicons-higher-resolution.png)

In the picture you see the GtkTreeView of the item list in 3 pane wide view
mode comparing 1.12 (left side) to branch favicon-rewrite (right side). The
functional change improving roughly 30% of the icons in my non-representative
feed list is by storing the icons in 128x128px instead of 32x32px as before.

The reason that this doesn't improve ~60% of the favicons is that many icons
are presented in resolutions smaller 128px. Some even only in 16px size.

## What's next

So how to improve the other 60%? I believe building a proper image discovery
is the way to go. If you are familiar with SEO optimizing a website you might
know that for perfect scores you have to provide dozens of different sizes for
favicons. 

If you want to get an impression of the complexity have a look at favicon
scaling services like [https://favicomatic.com/](https://favicomatic.com/)
or blog posts describing the necessary favicon sizes like 
[https://globalspex.com/logo-dimensions/](this one).

The takeaway is that many websites do provide many different favicon sizes
and the images are linked via HTML markup. Here is an example of how 
an average IT news site as [heise.de](https://heise.de) exposes those
images in their markup:

    <meta property="og:image" content="https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/icons/ho/opengraph/opengraph.png">
    <meta property="twitter:image" content="https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/icons/ho/opengraph/opengraph.png">
    <link href="/favicon.ico?v=JykvN0w9Ye" rel="icon">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/ho/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/ho/favicon/favicon-16x16.png">
    <link rel="mask-icon" href="/icons/ho/touch-icons/safari-pinned-tab.svg" color="#323232">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/ho/touch-icons/apple-touch-icon-180x180.png">
    <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/icons/ho/touch-icons/apple-touch-icon-precomposed.png">
    <meta name="msapplication-TileImage" content="/icons/ho/touch-icons/mstile-144x144.png">

So in this case, and I might have missed some, 9 images in different sizes
to choose from. Some of them even explicitely state their size. For example
the Apple touch icon with 180px.

All that's left to do is to build a robust selection mechanism and use those
high quality images!

## I don't see any favicons...

If you are wondering why you do not see favicons in 3-pane wide view you
probably do never read unread headlines by selecting a folder. When viewing
a folder the favicon column is added to help you distinguish the origin of
each headline in a visual way.

