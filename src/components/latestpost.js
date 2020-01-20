import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const LatestPost = () => {
  const data = useStaticQuery(graphql`
    query LatestPostQuery {
      allMarkdownRemark(
      filter: {fields: {sourceInstanceName: {eq: "blog"}}}
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1
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
  `)

  const post = data.allMarkdownRemark.edges[0].node
  const title = post.frontmatter.title || post.fields.slug

  return (
    <div className="latestpost">
      <h3>Latest post</h3>
      <article key={post.fields.slug} className="postlist__post">
        <header>
          <h4 className="postlist__posttitle">
            <Link to={`/${post.fields.sourceInstanceName}${post.fields.slug}`}>
              {title}
            </Link>
          </h4>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt
            }}
            className="postlist__postexcerpt"
          />
        </section>
      </article>
    </div>
  )
}

export default LatestPost
