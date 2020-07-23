module.exports = {
  siteMetadata: {
    title: 'Adam Karlsten',
    author: 'Adam Karlsten',
    description: 'Portfolio site for Adam Karlsten',
    siteUrl: 'https://akarlsten.github.io/',
    social: {
      github: 'akarlsten'
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
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      }
    },
    'gatsby-plugin-feed',
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
