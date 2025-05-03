This is a followup to the post [Better Favicons Part 1](Better-Favicons-Part-1). While the
change from April this year was about storing all favicons in a large resolution, to ensure
there is no upscaling when presented in 'Wide View', this is about finding better quality favicons
as used by iOS, Android and Microsoft Windows.

What was missing so far was a smart way of finding the best website icon each website presents.
A new and significantly more sophisticated logic for discovering icons has now been implemented.

## New Favicon Discovery

So how do we find icons?

Liferea will now [perform](https://github.com/lwindolf/liferea/commit/b7c29aa1fa1e50ee3fcb4c39771e3c5ddcaff171#) the following lookup strategy:

### 1. Find "high-res" icon

1. Look for `<link rel='icon' href='...' sizes='...'>` favicons with a reasonable size (>128px)
2. Look for `<link rel='apple-touch-icon' href='...' sizes='...'>` Apple touch icons with a mimimum size of 120px
3. Look for `<meta name='msapplication-TileImage' content='...'>` Microsoft tile images which we always expect to be large enough
4. Look for `<link rel='mask-icon' href='...'>` Safari mask icons

### 2. Find probably suitable icon

5. Look for size-less Apple touch icon which is expected to be 180px
6. Look for any favicons with size definition (<128px)
7. Look for any Apple touch icons (<128px)

### 3. Fallback

8. Use the small size standard favicon (which by standard is never larger than 48px)

All of the icons locations are tried for download in the given order and the first icon download
that works is the winner! There are some simplifications though:

- The code doesn't support the browserconfig.xml standard by Microsoft where 
  one can fetch more details on tile images to select more suitable locations.

- The code doesn't change the user agent to Safari/Android to discover favicons.
  There are websites out there that announce the proper icons only for specific
  user agents. And some of those sites have only a 16x16px icon for the web (e.g.
  Slashdot), for those sites the favicon discovery fails.
  
  Switching the user agent only for the favicon download (e.g. to Safari/Android)
  is hard to do as GNOME networking library libsoup treats the user agent as a 
  session property. Also ad-hoc switching user agents without the user knowing is surely
  bad style.

## Example Icons in 1.13.3

Let's take a random set of icons as downloaded by the last release:

![example icons as downloaded with 1.13.3](assets/favicons-improve2-old.png)

## Improved Icons with 1.13.4

Below you find the improvements in this release. 

![example icons as downloaded with the improved code](assets/favicons-improve2-new.png)

While it maybe not very easy to spot 8 out of the 28 example icons now have an improved resolution.

Out of the remaining 8 blurry icons all of them are not provided at a higher resolution
by the website they belong to. If you have such a feed and want to check wether its
website supports better favicons you can try a SEO favicon checker like [https://realfavicongenerator.net/favicon_checker](https://realfavicongenerator.net/favicon_checker).
