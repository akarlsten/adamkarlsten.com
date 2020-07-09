---
title: Daily Lunch
date: "2018-12-31"
description: "A Gatsby frontend for a Node REST API that scrapes local restaurant menus near my old job every day. Also has some fun stuff like geolocation!"
featuredImage: lunch-gleerups.png
github: "https://github.com/akarlsten/gleerups-lunch"
url: "https://lunch.adamkarlsten.com"
---

A Gatsby frontend for a Node REST API that scrapes local restaurant menus near my old job every day. Also has some fun stuff like geolocation; to see how far away each restaurant is and to generate dynamic directions via Google.

It started out as an excercise in React and Gatsby, especially the new Hook and Context APIs. It turned out to be pretty useful and popular with my coworkers so I kept working on it to add some extra features.

The API was made with Node and primarily uses the libraries [Axios](https://github.com/axios/axios) and [Osmosis](https://github.com/rchipka/node-osmosis) to fetch and then parse the restaurant menus. Everything is saved in a simple JSON database on drive called [LowDB](https://github.com/typicode/lowdb). A cron job on my VPS runs the scraping script a few times every weekday morning which causes a webhook to fire, rebuilding the frontend that is hosted on Netlify. Very simple, but it works!