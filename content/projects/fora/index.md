---
title: Fora
date: '2020-06-08'
featuredImage: fora.png
description: 'A forum platform in the vein of Reddit with user-created communities. Made with NextJS on the front-end and a GraphQL API from KeystoneJS on the back-end.'
github: 'https://github.com/akarlsten/fora'
url: 'https://fora.fun'
tags: ['NextJS', 'React', 'GraphQL', 'Apollo', 'KeystoneJS', 'Javascript']
---

A forum platform in the vein of Reddit with user-created communities. Instead of the up/downvote system for ranking threads and comments, it instead uses a more classic forum approach with everything sorted chronologically.

Users create forums about whichever topics they want, which they become owners of. They can then appoint moderators, who together with the owner have access to moderation tools (bans, locking threads, etc.) for the forum.

Other users are of course free to post threads and replies.

It was originally created for a university course, with my personal goal being to become more familiar with the GraphQL ecoystem.

The frontend stack is based on [NextJS](https://nextjs.org/), a framework built on top of React with a great routing system and Server-Side Rendering built in from the get-go. State management (what little there is) and data fetching is handled with [Apollo Client](https://www.apollographql.com/), a GraphQL client that makes it a breeze to query the backend API and cache data. The styling is done with the help of [TailwindCSS](https://tailwindcss.com/) which makes it a breeze to create a nice custom design without having to actually write much CSS.

The backend stack is based on [KeystoneJS](https://www.keystonejs.com/), a framework for creating GraphQL API's. It takes care of a lot of boilerplate such as an authentication system and basic CRUD resolvers for your models, while still allowing you to drop down and customize or extend anything as required. Keystone has its own ORM built-in, so database access is mostly abstracted away, but I chose to use MongoDB for this project.

Integration- and unit testing is done with [Jest](https://jestjs.io/) on the back-end. I didn't feel the need to unit test my frontend, but instead covered all common actions via "realistic" end-to-end testing with the help of [Cypress](https://www.cypress.io/).

The project was done off-and-on over a period of two months, near the end I felt crunched for time and had to rush a few things, but I'm generally pleased with the result.

If I had more time I would focus on the following:

- Refactor parts of the front-end - Some of the form components are quite messy and could use being split up into separate components. The same goes for certain conditional checks (such as if a user is allowed to post to a given thread), these are hard to read and reappear a few times in the code; I would like to split these out into reusable functions instead.

- Rewriting a lot of the access control logic on the back-end -
  During initial development there was no easy way to do unrelated database queries as part of other operations in Keystone, i.e. if a user sends a `CreateThread` mutation, we want to query the database wether that user is banned from the forum (or site) before allowing it to go through. I initially used a work-around to solve the problem, but it had some undesirable limitations if I wanted to add certain features to the application in the future.

  Near the end of the initial development period Keystone released a new version with features that would allow me to solve these problems in a much simpler and easier way, and I would like to implement these.
