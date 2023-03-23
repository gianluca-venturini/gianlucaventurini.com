require('dotenv').config({
    path: `.env`,
});

module.exports = {
    siteMetadata: {
        title: `Gianluca Venturini`,
        siteUrl: `https://gianlucaventurini.com`,
        description: ``,
    },
    plugins: [
        {
            resolve: `gatsby-source-prismic`,
            options: {
                repositoryName: process.env.PRISMIC_REPOSITORY_NAME,
                accessToken: process.env.PRISMIC_ACCESS_TOKEN,
                schemas: {
                    home: require('./src/schemas/home.json'),
                    bookshelf: require('./src/schemas/bookshelf.json'),
                    blog_post: require('./src/schemas/blog_post.json'),
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "G-WGXT94G4PQ",
            },
        },
        {
            resolve: `gatsby-plugin-react-helmet`
        },
        {
            resolve: 'gatsby-plugin-html-attributes',
            options: {
                lang: 'en'
            }
        },
        {
            resolve: `gatsby-plugin-styled-components`
        },
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                host: 'https://gianlucaventurini.com',
                policy: [{ userAgent: '*', allow: '/' }]
            }
        },
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: `https://gianlucaventurini.com`,
                stripQueryString: true,
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
        },
        {
            resolve: 'gatsby-plugin-image',
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                // Defaults used for gatsbyImageData and StaticImage
                defaults: {},
                // Set to false to allow builds to continue on image errors
                failOnError: true,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: "Gianluca Venturini",
              short_name: "Gianluca Venturini",
              start_url: "/",
              background_color: "#FF5252",
              theme_color: "#FF5252",
              display: "standalone",
              icon: "src/images/favicon.png"
            }
          }
    ],
};
