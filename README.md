# My personal website 
This is my personal website.

## Tech stack
I'm using [Gatsby](https://www.gatsbyjs.com/) static code generator, pulling data from [Prismic](https://prismic.io/) [headless CMS](https://prismic.io/headless-cms-intro).

The website is served from [Netlify](https://www.netlify.com/). A new [static build is triggered](https://docs.netlify.com/configure-builds/build-hooks/) every time I merge commits in the [master branch](https://github.com/gianluca-venturini/gianlucaventurini.com) or I update the content in [Prismic](https://prismic.io/). This makes the website extremely fast in loading and guarantees the best [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) support.

The frontend is built in [Typescript](https://www.typescriptlang.org/) using [React](https://reactjs.org/).

I implemented [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) using [Gatsby plugins](https://github.com/gianluca-venturini/gianlucaventurini.com/blob/master/gatsby-config.js).

The total cost of running this website is zero dollars.

## Installation
Install Gatsby: `npm install -g gatsby-cli`

## Develop
Run the dev server `gatsby develop`
Run the prod server `gatsby build && gatsby serve`

## Project status
[![Netlify Status](https://api.netlify.com/api/v1/badges/5b364caa-4fc3-4be9-b48e-90dbfd392960/deploy-status)](https://app.netlify.com/sites/hardcore-brattain-033f16/deploys)

## Live website
https://gianlucaventurini.com

## Useful resources
https://medium.com/source-group/start-a-new-website-with-gatsby-prismic-cms-netlify-a875455c992
