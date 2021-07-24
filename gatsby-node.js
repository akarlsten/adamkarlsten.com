const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })

    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: "sourceInstanceName",
      value: fileNode.sourceInstanceName,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve("./src/templates/blog-post.js")
  const projectPage = path.resolve("./src/templates/project.js")

  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                sourceInstanceName
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create posts pages.
  const rawPosts = result.data.allMdx.edges
  const blogPosts = rawPosts.filter(
    post => post.node.fields.sourceInstanceName === "blog"
  )
  const projectPages = rawPosts.filter(
    post => post.node.fields.sourceInstanceName === "projects"
  )
  const allPosts = [blogPosts, projectPages]

  allPosts.forEach(postType => {
    postType.forEach((post, index) => {
      const previous =
        index === postType.length - 1 ? null : postType[index + 1].node
      const next = index === 0 ? null : postType[index - 1].node

      const template =
        post.node.fields.sourceInstanceName === "blog" ? blogPost : projectPage

      createPage({
        path: `/${post.node.fields.sourceInstanceName}${post.node.fields.slug}`,
        component: template,
        context: {
          slug: post.node.fields.slug,
          subdirectory: post.node.fields.sourceInstanceName,
          previous,
          next,
        },
      })
    })
  })
}
