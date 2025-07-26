# Simple Markdown Blog

Github action to build RSS feeds and a static HTML to view the blog by loading the markdown files.

Currently maps 2 blogs

1. blog/
2. liferea/blog/

The blogs are configured by the respective `index.html`.

## Deploy

Install dependencies with 

    npm install
    npm run installDeps

Then copy `www` directory to your a subfolder in your webserver root.