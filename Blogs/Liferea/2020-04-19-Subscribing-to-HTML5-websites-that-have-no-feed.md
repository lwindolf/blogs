## New feature: HTML5-based website scraping fallback

For 1.13.1 I've just merged a feature that will use HTML5 markup
when there is no feed provided by a website to collect articles.

## Preparing for the post-RSS age

As of today most of the websites still provide RSS feeds. Still
I suspect we will see more and more sites without feeds. Mostly
in public sector websites often have historically bad markup and
are entirely missing feeds. Nowadays some of the websites do see
an overhaul and suddenly have proper HTML5 markup. Of course
they are still missing a feed.

The German state of Brandenburg portal is such an 
<a href="https://www.brandenburg.de/">example</a>.
With the new HTML5 feed support Liferea allows to 
subscribe directly to the website.

In general I believe this is a good fallback to have for every
news aggregator to allow users to stay within the aggregator
and to subscribe to even unlikely sources.

## Parsing Semantic HTML5

The good thing about HTML5 is that it can be more than a mindless
soup of &lt;p>, &lt;span> and &lt;div> tags. With tags such as
&lt;header>, &lt;figure>, &lt;article> and many more it becomes
possible to know what stuff is.

So if Liferea parses the frontpage of a news website and discovers
multiple &lt;article> tags including a h1,h2 or h3 tag and a link
it will use those as headlines.

## Auto-discovery precedence

For now Liferea will first check for actual feed links in the 
website and only if it doesn't find feed links it will check 
if the website is suitable HTML5 and start extracting content
like this.
