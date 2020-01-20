import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import { IconContext } from 'react-icons'
import { FaCommentDots } from 'react-icons/fa'

import Layout from '../components/layout'
import SEO from '../components/seo'

class BlogPostTemplate extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const { previous, next, subdirectory } = this.props.pageContext
    const disqusConfig = {
      url: `${siteUrl}/${post.fields.sourceInstanceName}${post.fields.slug}`,
      identifier: post.id,
      title: post.frontmatter.title
    }
    const { featuredImage } = post.frontmatter
    const featuredImagePath = featuredImage && featuredImage.childImageSharp.fluid.src

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          image={featuredImagePath}
        />
        <article>
          <header className="blog__header">
            <h3 className="blog__title">
              {post.frontmatter.title}
            </h3>
            <div className="blog__subheader">
              <p className="blog__date">
                {post.frontmatter.date}
              </p>
              <div className="blog__commentcounter">
                <IconContext.Provider value={{ className: 'blog__icon' }}>
                  <FaCommentDots /> <CommentCount config={disqusConfig} placeholder={'...'} />
                </IconContext.Provider>
              </div>
            </div>
          </header>
          {post.frontmatter.featuredImage &&
            <div className="blog__imagecontainer">
              <Img className="blog__image" fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />
            </div>
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

        <Disqus config={disqusConfig} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
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
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
        sourceInstanceName
      }
    }
  }
`
