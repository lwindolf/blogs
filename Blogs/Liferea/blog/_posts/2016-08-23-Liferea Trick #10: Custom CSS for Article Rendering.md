Liferea renders articles as HTML content using Webkit (the Safari rendering engine) with colors adapted to the active GTK theme in a somewhat neutral and mail like style. If you dislike it you might want to change aspects of the CSS used to render the articles.

## How it Works

To facilitate this Liferea loads 2 CSS definitions

- a predefined one in `<install root>/share/liferea/css/liferea.css`
- an empty one with all styles documented in `~/.config/liferea/liferea.css`


Both stylesheets are loaded so that the one in your home directory overrules the predefined one. 
And the documentation should help you to find the selectors you want to overwrite. Have a 
look at `~/config/liferea/liferea.css` and try to change definitions. It is really easy.

Some example lines from `~/.config/liferea/liferea.css`:

    /* Header table fields to different item metadata */
    // .author, .categories, .source { }
    // .date { }

    /* Item/feed description */
    // div.content { }

    /* Comment rendering */
    // div.comment { }
    // div.comment_body { }
    // div.comment_title { }

<hr/>

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
