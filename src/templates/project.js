import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { IconContext } from 'react-icons'
import { FaGithub, FaLink } from 'react-icons/fa'

import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next, subdirectory } = this.props.pageContext
    const { featuredImage } = post.frontmatter
    const featuredImagePath = featuredImage && featuredImage.childImageSharp.fluid.src

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          image={featuredImagePath}
        />
        <article className="project__content">
          <header className="project__header">
            <h3>
              {post.frontmatter.title}
            </h3>
          </header>
          {post.frontmatter.featuredImage &&
            <div className="project__imagecontainer">
              <Img className="project__image" fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
            </div>
          }
          {post.frontmatter.tags && (
            <div className="projectlist__tagcontainer">
              {
                post.frontmatter.tags.map(tag => (
                  <div className="projectlist__tag">{tag}</div>
                ))
              }
            </div>
          )}
          {(post.frontmatter.github || post.frontmatter.url) &&
            <IconContext.Provider value={{ className: 'project__icon' }}>
              <div className="project__links">
                {post.frontmatter.github &&
              <a className="project__link" href={post.frontmatter.github} target="_blank" rel="noopener noreferrer">
                <FaGithub /> <p>View source</p>
              </a>
                }
                {post.frontmatter.url &&
              <a className="project__link" href={post.frontmatter.url} target="_blank" rel="noopener noreferrer">
                <FaLink /> <p>{post.frontmatter.url}</p>
              </a>
                }
              </div>
            </IconContext.Provider>
          }
          <section className="markdown" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <nav className="post__navigation">
          <ul>
            <li>
              {next && (
                <Link to={`/${subdirectory}${next.fields.slug}`} rel="next">
                  ← {next.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {previous && (
                <Link to={`/${subdirectory}${previous.fields.slug}`} rel="prev">
                  {previous.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        github
        url
        tags
        featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
