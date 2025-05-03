Are you by any chance a manga fan? Does your favourite manga website not 
publish RSS feeds? Then you might be interested in this scraping example
for mangas hosted at `mangakatana.com`.

## How it works

`mangakatana.com` has manga overview pages like this one for 
[Eminence in Shadow](https://mangakatana.com/manga/the-eminence-in-shadow.22020).
If you inspect the chapter list on this page (right click on it 
and choose "Inspect") you see a HTML structure like this:

    <div class="chapters">
         ...
         <div class="chapter">
            <a href="https://mangakatana.com/manga/the-eminence-in-shadow.22020/c59">Chapter 59</a>
         </div>
         ...
         <div class="chapter">
            <a href="https://mangakatana.com/manga/the-eminence-in-shadow.22020/c58">Chapter 58</a>
         </div>
         ...
    </div>

One way to extract this structure is using XSLT. An example stylesheet
can be found in the RSS scraping example repo: [mangakatana-chapters.xsl](https://github.com/lwindolf/rss-scraping/blob/main/examples/mangakatana-chapters.xsl).

Using this stylesheet we can create a feed like this:

1. Download the XSLT stylesheet file to `~/.config/liferea/`
2. Right click in the feed list and choose "New subscription ..."
3. Click "Advanced"
4. Select "Command" as feed source
5. Set the following command

       curl -L https://mangakatana.com/manga/the-eminence-in-shadow.22020 | xsltproc --html --novalid ~/.config/liferea/mangakatana-chapters.xsl -

6. Click "OK" to subscribe
7. Finally open the feed properties
8. In tab "Cache" set cache to "Unlimited"
9. In tab "Advanced" you can optionally enable "Auto-load item link..."

If it does not work check wether you have `curl` and `xsltproc` installed!

## Contribute Examples!

Did you adapt the XLST to other websites? If yes consider making a pull request with
your new stylesheet to the [RSS scraping repo](https://github.com/lwindolf/rss-scraping)!
