/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import loadable from '@loadable/component'

const Logo = loadable(() => import('./logo'))

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 500) {
            ...GatsbyImageSharpFluid
          }
        }
      }
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
      <Image
        className="bio__avatar"
        fluid={data.avatar.childImageSharp.fluid}
        alt={author}
      />
      <div className="bio__text">
        <div className="bio__logo">
          <Logo />
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
  )
}

export default Bio
