## History

lzone.de originally was a simple blog to collect and share occasional knowledge for
system administration and DevOps. Starting around 2020 on it changed into a somewhat
systematic cheat sheet collection. It is similar to https://devhints.io with
the focus of the cheat sheets on DevOps instead of Devs.

## Avoiding duplication

While writing cheat sheets and collecting importing pieces of knowledge it bugged me
to start writing cheat sheets for topics were good ones already did exist. Still I did want
to use those in the same way like my self-written ones. What do to?

## Generic installation of 3rd party cheat sheets

Well it turns out that many developers and DevOps started writing cheat sheets in 
Markdown format stored in https://github.com hosted repositories. That included me.
So I rewrote lzone.de to install all cheat sheets by directly pulling from github.com.
This includes pulling a catalog which gives a curated list of cheat sheets that I believe
are worth installing.

## The political dimension

### Skip search engines

Finally there is a political dimension. Sharing cheat sheet and git books with each other
without earning money by overloading pages with ads is an ideal I like. I also enjoy not
using Google to search through content source I require for my work. This is enabled by
lzone.de with a simple lunr search index that searches through all installed content.
Combined with a simple https://huggingface.co chatbot embed it is possible to avoid using
major search engines all together.

## Search indexes owned by users!

lzone.de might not be there yet. But imagine that you can create a content collection and
automatically build a full text search index for the collection. Imagine a **locally** running
chat bot answering you questions for the content and doing searches for you.

This is what internet companies are actively preventing you from achieving.

## Skip CORS limitations - start crawling!

Finally there is the embedded feed reader using a CORS proxy. Somehow the web gained a
mechanism called <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS">CORS</a>
which is said to protect everyone from evil content embedding. Which it does in a way. Still
weighting how this disproportionally helps major social networks keep content gated and at
the same time prevent a simple basic technology like RSS to work in your browser per default,
at least I believe this is a severe misbalance for security in social networking and being
free to crawl the internet yourself.

Deciding against CORS enables

- content extraction for your private use cases
- scripting any online service
- an RSS reader in your webpage, no extra client needed
- do all of this without a server

This of course means less security. It is a decision to be careful about.
