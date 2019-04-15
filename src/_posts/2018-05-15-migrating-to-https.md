---
layout: post
title: Migrating to HTTPS
category: Blog
date: 2018-05-15
tags:
 - https
comments: true
permalink: "/blog/{{ title | slug }}/"

---

In February, [Google announced](https://blog.chromium.org/2018/02/a-secure-web-is-here-to-stay.html) that beginning in July with the release of Chrome 68, their web browser will mark all HTTP sites as "not secure".

So, while making a web site secure has always been important, now is the time to actually take the step from <code>http</code> to <code>https</code>. That is, if you haven't already.

I am using GitHub Pages for this site, so I checked out their guide on [securing GitHub Pages sites with HTTPS](https://help.github.com/articles/securing-your-github-pages-site-with-https/), but unfortunately this doesn't cover custom domains. So what's a webmaster to do?

## Cloudflare to the rescue

My web hosting is working on integrating [Let's Encrypt](https://letsencrypt.org/), which will eventually offer me a free certificate for this site, but for some reason the progress is slow. And I couldn't wait. Chrome 68 is about to happen soon.

So, I chose to go with [Cloudflare](https://www.cloudflare.com/), and created an account. They offer a free plan for personal websites and there is an [extensive instruction here](https://support.cloudflare.com/hc/en-us/articles/201720164-Step-2-Create-a-CloudFlare-account-and-add-a-website).

You may also be interested in this [article on CSS-tricks.com](https://css-tricks.com/switching-site-https-shoestring-budget/).

So, after adding my site to Cloudflare, I had a cup of coffee and sat down waiting for the DNS to kick in.

Well, actually, I didn't sit around waiting, because it took some time to finish. Anyway, it seems to be working fine, and yay, it's secure!
