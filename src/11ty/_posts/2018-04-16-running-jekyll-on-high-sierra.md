---
layout: post
title: Running Jekyll on MacOS High Sierra
category: Blog
date: 2018-04-16
tags:
 - jekyll
comments: true
permalink: "/blog/{{ title | slug }}/"

---

So it was time to show my blog a little affection – you know, a little housekeeping involving updating development dependencies and other stuff like checking that build commands still run as expected.

Which they didn't. Well, for the most part they did, but Jekyll refused to play nice with me. I got this system message telling me Ruby wasn't really playing the game:

```rb
/System/Library/Frameworks/Ruby.framework/Versions/2.0/usr/
bin/ruby: bad interpreter: No such file or directory
```
A quick search resulted in posts like [this](https://github.com/jekyll/jekyll/issues/6637), and after trying some ruby magic I stumbled on [Nokigiri](https://github.com/sparklemotion/nokogiri) which refused to play at all, and so I ended up on [this post](https://stackoverflow.com/questions/46866828/ruby-nokogiri-gem-install-mac-osx-high-sierra).

I had no luck with all those tricks, and I can't say I understand everything that's going on under the hood of the Terminal. But what I did
understand from my research was that when I updated MacOS to High Sierra, the Ruby version was also updated to version 2.3, but Jekyll still tried to reference Ruby version 2.0.

So eventually, I found [this post on Stack Overflow](https://stackoverflow.com/questions/46541019/jekyll-with-ruby-2-3-on-macos-10-13-highsierra/46742979#46742979), where a comment offered the simplest of solutions.

Uninstall Jekyll, and install it again. That easy, huh?

```rb
gem uninstall Jekyll
gem install Jekyll
```
Yeah, that easy. It worked, problem solved. Move on.
