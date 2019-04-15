---
layout: post
title: Development and production settings for Jekyll
date: 2016-03-13
category: Blog
tags:
 - jekyll
comments: true
redirect_from:
- /blog/2016/03/13/development-and-production-settings-for-jekyll.html
permalink: "/blog/{{ title | slug }}/"

---

As I installed Google Analytics, I wanted to keep it from tracking pages on my local development web server. I found [this neat solution](http://david.elbe.me/jekyll/2015/06/08/jekyll-different-settings-production-github-and-development.html) by David Elbe, which lets med keep development stuff apart from production stuff. On GitHub Pages,  <code>jekyll.environment</code> is always set to <code>production</code>.

```rb {% raw %}
{% if jekyll.environment == 'production' %}
  /* Production stuff */
{% else %}
  /* Development stuff */
{% endif %} {% endraw %}
```
