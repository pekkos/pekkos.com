---
layout: post
title: Syntax highlighting for Jekyll
category: Blog
date: 2016-03-13
tags:
 - jekyll
 - code
comments: true
redirect_from:
- /blog/2016/03/13/syntax-highlighting.html
permalink: "/blog/{{ title | slug }}/"
---
Reading code isn't always that easy, which is why syntax highlighting is a good idea.

As stated on [GitHub Pages](https://help.github.com/articles/using-syntax-highlighting-on-github-pages/), you can use [Rouge](http://rouge.jneen.net/) out of the box with Jekyll. In Jekyll 3 and above, [Rouge is the default syntax highlighter](http://jekyllrb.com/docs/templates/#code-snippet-highlighting) and works for 60+ languages.

In fact, [GitHub Pages *only* supports](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0) Rouge as syntax highlighter. Traditionally, highlighting in Jekyll was implemented using the <code>&#123;% highlight %&#125;</code> Liquid tag, but now pure Markdown should be used instead.

## Code blocks

To create a fenced code block, [use triple backticks](https://help.github.com/articles/creating-and-highlighting-code-blocks/) <code>```</code> before and after the the code block, and include the language you are using after the first backticks, like so:

<pre>
```scss
@mixin text-color($color) {
  color: $color;
}

.header {
  min-height: 4em;
  background-color: rgb(0,0,0);
  @include text-color(white);
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(244,201,73,0.1);
}
```
</pre>

The above results in the following <code><pre></code> formatted code block, and you can make your code look pretty using a [Pygments CSS theme](http://jwarby.github.io/jekyll-pygments-themes/languages/javascript.html) compatible with Rouge:

```scss
@mixin text-color($color) {
  color: $color;
}

.header {
  min-height: 4em;
  background-color: rgb(0,0,0);
  @include text-color(white);
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(244,201,73,0.1);
}
```

## Liquid tags

Finally, if you want to write a fenced code block containing Liquid tags, you need to wrap your code with <code>&#123;% raw %&#125;</code> and <code>&#123;% endraw %&#125;</code> to stop Liquid from interpreting your code as Liquid.

<pre>
</pre>

Which results in the following:

```rb {% raw %}
{% include header %} {% endraw %}
```
