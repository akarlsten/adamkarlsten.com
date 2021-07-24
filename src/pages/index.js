import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/bio'
import LatestPost from '../components/latestpost'
import Social from '../components/social'
import SEO from '../components/seo'
import { BigSquiggle } from '../components/squiggles'

class Index extends React.Component {
  render() {
    const { data } = this.props

    return (
      <>
        <SEO title="Hej!" />
        <Bio />
        <LatestPost />
        <Social />
        <BigSquiggle className="bio-squiggle" />
      </>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
