module.exports = {
  siteMetadata: {
    title: 'Adam Karlsten',
    author: 'Adam Karlsten',
    description: 'Portfolio site for Adam Karlsten',
    siteUrl: 'https://www.adamkarlsten.com',
    social: {
      github: 'akarlsten',
      linkedin: 'adam-karlsten-171b62116'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/projects`,
        name: 'projects'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.md`, `.mdx`],
        remarkPlugins: [require('remark-unwrap-images')],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              showCaptions: true
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/components/layout.js'),
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-173341589-1'
      }
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'akarlsten'
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Adam Karlsten',
        short_name: 'A Karlsten',
        start_url: '/',
        background_color: '#141622',
        theme_color: '#ffcc59',
        display: 'minimal-ui',
        icon: 'content/assets/favicon.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-humans-txt',
      options: {
        team: [
          {
            Developer: 'Adam Karlsten',
            GitHub: 'akarlsten'
          }
        ],
        thanks: ['Gatsby', 'Node', 'React'],
        site: {
          Softwares: 'Visual Studio Code'
        },
        note: 'Made in Malmö, Sweden'
      }
    }
  ]
}
