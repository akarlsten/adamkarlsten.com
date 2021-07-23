import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/bio'
import LatestPost from '../components/latestpost'
import Social from '../components/social'
import SEO from '../components/seo'
class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <>
        <SEO title="Hej!" />
        <Bio />
        <LatestPost />
        <Social />
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
