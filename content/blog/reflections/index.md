---
title: Reflections on CSS pre-processors, SSG's and more
date: "2019-11-19"
---

It's been an interesting challenge making this site, and I've probably spent much more time on it than I really had to. It's been time well spent though, and I've learnt a lot more about Gatsby (and it's API's) than I knew before. I wrote a bit about it under my newly created projects category, [here](/projects/this-page)!

Moving on to the questions:

#### CSS Pre-processors

I've always liked SASS and other preprocessors, they helped you accomplish things that were either very tricky or tedious with regular CSS. Stuff like variables, mixins (❤️), and the ability to do calculations make it easy to reason about your stylesheets to get the desired results.

Things move quickly in the web world however, and it seems like regular old native CSS is catching up to a lot of these features.
Variables and `calc()` already exist, and there's apparently a draft for native mixin-like functionality. On the other hand the built-in helper functions and syntax of SASS is (to me) a bit simpler. For example, the proposed `color-mod(var(--mycolor) shade(10%))` vs. SASS `darken($mycolor, 10%)`.

Of course, just getting SASS to work at all requires setting up some kind of buildtool (webpack.config 😣), which may not always be desired or necessary. In most scenarios this usually isn't a problem, since you'll be using a buildtool anyway and can just tack SASS on.

This is not to mention the current trend around the big UI frameworks like React or Vue to make styling a part of the UI components: writing your CSS directly in JS files and so avoiding many of the pitfalls with giant stylesheets.

Who knows what might happen in the near future?

For this project I used SASS as required, the Gatsby template I started with used CSS-in-JS directly on each component so I had to rip those out. Then I created a few base stylesheets, one for colors and size variables, one for typography and one for the base styles of `html`, `body` and `main`. Everything gets imported into `styles.scss` that is then injected into the site.

Early on I decided to try and keep order by utilizing one stylesheet per page or component, while also using the BEM methodology when naming classes. This made it quite easy to keep track of everything!

#### Static Site Generators

SSGs are amazing! The fact that they generate completely static files makes them very fast and enables you to scale up to match any kind of load. Plop the generated files on one of the big CDNs and your site will probably never get overloaded for any reason (but perhaps taken down if you can't pay the bandwidth fees).

The older SSGs like Jekyll were mostly suitable for personal or small "brochure" sites, I'm thinking of stuff like blogs, restaurant websites with the menu (for a pizza place, for example) but no real interactivity. They were a lot faster than something similiar built in old CMS platforms like Wordpress or Drupal, and usually easier to develop as well.

The newer ones like Gatsby can do a lot more than that, being simultaneously a set of pre-generated static files while also having the power of a full React app. This enables you to get the speed of statically delivered files (for static content) while also being able to fetch and utilize dynamic content with a high degree of interactivity.

As far as I understand it, you can build pretty much anything!

#### Robots.txt & Humans.txt

Robots.txt tells various robots, such as search engine crawlers, what they should and shouldn't track on your website. You may for example want to disallow certain paths from being indexed by search engines. I used the already included robots.txt from my Gatsby template, but I added a plugin to generate a sitemap and linked to that also.

Humans.txt is essentially a credits page for your website, it tells curious users who created the site, what tools were used, etc. I used a plugin for this one also, there aren't that many people to credit so I listed some of the tools used to fill it out a bit.

#### Comments

Implementing comments was surprisingly smooth. I signed up for Disqus, installed the Gatsby plugin and added it to my blog posts (as you can see below). Initially I kept getting an "Unable to load Disqus" error, apparently Disqus sometimes has issues if it is first loaded on `localhost` but after deploying my site to Github Pages once it started working everywhere. I've only tested it with one comment so far, but it seems to be working!

#### Open Graph

Open Graph is a protocol for website metadata that allows different kinds of social media to automatically infer link data when someone uploads a link to your site. It includes things like the website title, the type of object you're linking to, a specific preview image, etc.
A useful tool to get pretty links.

In Gatsby it's all taken care of programatically by the built-in SEO component, inferring the Open Graph fields from your content.

_That's all for now!_
