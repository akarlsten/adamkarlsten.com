/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image";
import loadable from '@loadable/component'

const Greeting = loadable(() => import('./greeting'))

const Bio = () => {
  const data = useStaticQuery(graphql`query BioQuery {
  site {
    siteMetadata {
      author
    }
  }
}
`)

  const { author } = data.site.siteMetadata

  return (
    <div className="bio">
      <StaticImage
        src="../../content/assets/profile-pic.jpg"
        className="bio__avatar"
        alt={author} />
      <div className="bio__text">
        <div className="bio__logo">
          <Greeting />
        </div>
        <p>
          I&apos;m <strong>{author}</strong>, a web developer from Malmö,{' '}
          <span role="img" aria-label="Sweden">
            🇸🇪
          </span>
          !
        </p>
        <p>
          Have a look at some of the <Link to={'/projects'}>projects</Link>{' '}
          I&apos;ve worked on, or check out my <Link to={'/blog'}>blog</Link>!
        </p>
      </div>
    </div>
  );
}

export default Bio
