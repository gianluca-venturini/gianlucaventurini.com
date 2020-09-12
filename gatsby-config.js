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
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-64351268-1",
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
            resolve: `gatsby-plugin-web-font-loader`,
            options: {
                custom: {
                    families: ["Inter"],
                    urls: ["/fonts.css"],
                }
            },
        },
    ],
};
