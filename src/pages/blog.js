import React from 'react'
import { Link, graphql } from 'gatsby'

import SEO from '../components/seo'

import { BigSquiggle } from '../components/squiggles'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <>
        <SEO title="Blog" />
        <section className="postlist">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article
                key={`/${node.fields.sourceInstanceName}${node.fields.slug}`}
                className="postlist__post"
              >
                <header>
                  <h4 className="postlist__posttitle">
                    <Link
                      to={`/${node.fields.sourceInstanceName}${node.fields.slug}`}
                    >
                      {title}
                    </Link>
                  </h4>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt
                    }}
                    className="postlist__postexcerpt"
                  />
                </section>
              </article>
            )
          })}
          <BigSquiggle />
        </section>
      </>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            sourceInstanceName
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
