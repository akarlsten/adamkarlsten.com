import React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image";

import Layout from '../components/layout'
import SEO from '../components/seo'
import { TagContainer, Tag } from '../components/tag'

class ProjectsIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    return (
      <>
        <SEO title="Projects" />
        <section className="projectlist">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const featuredImg = node.frontmatter.featuredImage
            return (
              <article key={node.fields.slug} className="projectlist__post">
                <header>
                  <Link
                    to={`/${node.fields.sourceInstanceName}${node.fields.slug}`}
                  >
                    {featuredImg && (
                      <div className="projectlist__imagecontainer">
                        <GatsbyImage
                          alt={node.frontmatter.title}
                          image={featuredImg.childImageSharp.gatsbyImageData}
                          className="projectlist__image" />
                      </div>
                    )}
                  </Link>
                  <h4 className="projectlist__posttitle">
                    <Link
                      to={`/${node.fields.sourceInstanceName}${node.fields.slug}`}
                    >
                      {title}
                    </Link>
                  </h4>
                </header>
                <section className="projectlist__excerptcontainer">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt
                    }}
                    className="projectlist__postexcerpt"
                  />
                  {node.frontmatter.tags && (
                    <TagContainer>
                      {node.frontmatter.tags.map(tag => (
                        <Tag key={tag} subject={tag} />
                      ))}
                    </TagContainer>
                  )}
                </section>
              </article>
            );
          })}
        </section>
      </>
    );
  }
}

export default ProjectsIndex

export const pageQuery = graphql`{
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(
    filter: {fields: {sourceInstanceName: {eq: "projects"}}}
    sort: {fields: [frontmatter___date], order: DESC}
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
          tags
          featuredImage {
            childImageSharp {
              gatsbyImageData(width: 800, layout: CONSTRAINED, quality: 80)
            }
          }
        }
      }
    }
  }
}
`
