import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getSrc } from "gatsby-plugin-image";
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { IconContext } from 'react-icons'
import { FaGithub, FaLink } from 'react-icons/fa'

import SEO from '../components/seo'
import { TagContainer, Tag } from '../components/tag'

import { BigSquiggle } from '../components/squiggles'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const { previous, next, subdirectory } = this.props.pageContext
    const { featuredImage } = post.frontmatter
    const featuredImagePath = getSrc(featuredImage)

    return (
      <>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          image={featuredImagePath}
        />
        <article className="project__content">
          <header className="project__header">
            <h3>{post.frontmatter.title}</h3>
          </header>
          {post.frontmatter.featuredImage && (
            <div className="project__imagecontainer">
              <a href={featuredImagePath} target="_blank" rel="noopener">
                <GatsbyImage
                  quality="80"
                  alt={post.frontmatter.title}
                  image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                  className="project__image" />
              </a>
            </div>
          )}
          {post.frontmatter.tags && (
            <TagContainer>
              {post.frontmatter.tags.map(tag => (
                <Tag key={tag} subject={tag} />
              ))}
            </TagContainer>
          )}
          {(post.frontmatter.github || post.frontmatter.url) && (
            <IconContext.Provider value={{ className: 'project__icon' }}>
              <div className="project__links">
                {post.frontmatter.github && (
                  <a
                    className="project__link"
                    href={post.frontmatter.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub /> <p>View source</p>
                  </a>
                )}
                {post.frontmatter.url && (
                  <a
                    className="project__link"
                    href={post.frontmatter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLink /> <p>{post.frontmatter.url}</p>
                  </a>
                )}
              </div>
            </IconContext.Provider>
          )}
          <section className="markdown">
            <MDXRenderer>{post.body}</MDXRenderer>
          </section>
        </article>
        <BigSquiggle className="post__navigation-squiggle" />
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
      </>
    );
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`query ProjectBySlug($slug: String!) {
  site {
    siteMetadata {
      title
    }
  }
  mdx(fields: {slug: {eq: $slug}}) {
    id
    excerpt(pruneLength: 160)
    body
    frontmatter {
      title
      date(formatString: "MMMM DD, YYYY")
      description
      github
      url
      tags
      featuredImage {
        childImageSharp {
          gatsbyImageData(width: 800, layout: CONSTRAINED)
        }
      }
    }
  }
}
`
