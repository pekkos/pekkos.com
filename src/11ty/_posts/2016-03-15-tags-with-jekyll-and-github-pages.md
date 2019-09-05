---
layout: post
title: Tags with Jekyll and GitHub Pages
category: Blog
date: 2016-03-15
tags:
 - jekyll
comments: true
redirect_from:
- /blog/2016/03/15/tags-with-jekyll-and-github-pages.html
permalink: "/blog/{{ title | slug }}/"

---
Coming from the Wordpress world, I'm used to easily work with tags and categories for blog posts. However, tags aren't supported out of the box in Jekyll. Here is a [nice Ruby plugin](https://github.com/pattex/jekyll-tagging) that will do the trick. But since my blog is published using GitHub Pages, and GitHub Pages doesn't allow Ruby plugins, I can't use this.

I found a solution by [Brandon Parsons](https://twitter.com/bkparso), where you create a [tags page](/tags/) which gets populated with all used tags and links to posts. There is no way to dynamically create separate pages for each tag, but this should be good enough for me. If you really really want separate pages for each tag, [there is a solution here](http://charliepark.org/tags-in-jekyll/).

Add tags to YAML front matter, and add a few lines of code to list all tags for the post. Code for the tags page can be found in [Brandons blog post](https://blog.brandonparsons.me/2015-using-tags-in-a-jekyll-blog-on-github-pages).

```rb
---
tags:
  jekyll
---
```

```yaml
{% raw %}<ul>
  {% for tag in page.tags %}
  <li>
    <a href="/tags/#{{ tag }}">{{ tag }}</a>
  </li>
  {% endfor %}
</ul>{% endraw %}
```
