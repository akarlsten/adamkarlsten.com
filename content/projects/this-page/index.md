---
title: This page!
date: '2019-11-19'
featuredImage: adamblog.png
github: 'https://github.com/akarlsten/adamkarlsten.com'
tags: ['Gatsby', 'React', 'Javascript']
---

This portfolio website and blog was built entirely with Gatsby, originally as part of an exam assignment for the course 1DV022 Client-based web programming at Linnaeus University.

We had a choice of either using Jekyll or Gatsby, and as I've used Gatsby before and am familiar with React it was an easy choice!

I started out with the [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) template and heavily modified it:

- Tore out the CSS-in-JS and moved to separate stylesheets with SASS, decided to try to follow the BEM convention. Then redid the styling from scratch.
- Added support for several different types of posts, not just blogging but also project pages (like this one!).
  Project pages put more of an emphasis on images and don't have comments.
- Added support for Disqus comments (only on blog posts) as that was a requirement for the assignment.

I've learnt a lot about Gatsby during this project, especially about how to source data in Gatsby and how to use that data to generate discrete pages.

I've spent quite a lot of time on it, with the goal of making this my new homepage once I'm happy with it. 😄
