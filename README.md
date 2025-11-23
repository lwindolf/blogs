# Simple Markdown Blog

Github repo with action to continuosly build

- build RSS feeds
- a static HTML to view the blog by loading the markdown files
- matching gopher phlogs 

Currently maps 2 blogs

1. blog/
2. liferea/blog/

The blogs are configured by the respective `index.html`. The `www`
sub dir has additional static content.

FIXME: some static legacy content in `About`

## Build

Install dependencies with 

    npm install
    npm run installDeps

Build blogs + phlogs with

    npm run build

## Deploy

- Copy the `www` directory to your a subfolder in your webserver root.
- Copy the `gopher` directory into your gopher root.