---
categories: Jekyll
---

Researching this for some hours I want to document it:

## Collections without frontmatter are not possible

More exactly: adding Markdown files without frontmatter in a collection 
will not work as expected. The Markdown file will simply be published
as is (no HTML) to your site.

The findings:

- Worked in very old Jekyll versions (2.x). Broke around v3.1 
  and wasn't fixed, but instead documented.
- Not even supported by the jekyll-optional-front-matter plugin
- Using plugin jekyll-title-from-headings also doesn't help

## Conclusion

So if you have to work with input files without front matter
you have to treat them as posts or pages to avoid Jekyll just
copying the Markdown to the target directory.

## Workaround using subdir+category

If you have a use case where you did rely on the collection
list being available under `site.<collection>` you could 
iterate over all posts/pages of a common category instead.

If you keep all the documents in a subdir setting the 
category by default from matter can help:


    defaults:
       - scope:
           path: subdir
         values:
           category: name-of-collection
