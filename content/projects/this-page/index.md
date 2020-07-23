---
title: This page!
date: '2019-11-19'
featuredImage: adamblog.png
github: 'https://github.com/akarlsten/adamkarlsten.com'
tags: ['Gatsby', 'React', 'Javascript']
---

This portfolio website and blog was built entirely with Gatsby, originally as part of an exam assignment for the course 1DV022 Client-based web programming at Linnaeus University.

I started out with the [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) template and heavily modified it:

- Tore out the CSS-in-JS and moved to separate stylesheets with SASS, decided to try to follow the BEM convention. Then redid the styling from scratch.
- Added support for several different types of posts, not just blogging but also project pages (like this one!).
  Project pages put more of an emphasis on images and don't have comments.
- Added support for Disqus comments (only on blog posts) as that was a requirement for the assignment.

I've recently updated the page with a nice little Three.js animation on the landing page (together with react-three-fiber) and added technology tags to project posts.
