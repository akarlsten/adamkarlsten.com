import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <>
        <SEO title="404: Not Found" />
        <div className="notfound">
          <h1>Not Found</h1>
          <p>You just hit a route that doesn&#39;t exist...</p>
        </div>
      </>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
