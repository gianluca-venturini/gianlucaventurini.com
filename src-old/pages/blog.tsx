import { graphql, PageProps, Link } from "gatsby";
import React from "react";
import { Page } from "../components/Page";
import { DESCRIPTION_320 } from "../components/Constants";
import { Typography, FONTS } from "../components/Typography";
import { GUTTERS } from "../components/Styles";
import { COLORS } from "../components/Theme";

interface BlogIndexPageProps {
    allPrismicBlogPost: {
        nodes: [{
            uid: string,
            data: {
                publish_date: string,
                title: {
                     text: string,
                }
            }
        }]
    }
}

 const BlogIndexPage: React.FC<PageProps<BlogIndexPageProps>> = props => {
    return (
        <Page
            title="Blog"
            description={DESCRIPTION_320}
            location={props.location}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: GUTTERS.maxi }}
        >
            {props.data.allPrismicBlogPost.nodes.map(blogPost => (
                <Link key={blogPost.uid} to={`/blog/${blogPost.uid}`} style={{ textDecoration: 'none' }}>
                    <Typography variant={FONTS.title.large}>{blogPost.data.title.text}</Typography>
                    <Typography variant={FONTS.label.medium} style={{ color: COLORS.text.light }}>{blogPost.data.publish_date}</Typography>
                </Link>
            ))}
        </Page>
    );
}

export default BlogIndexPage;

export const IndexQuery = graphql`
query BlogPosts {
    allPrismicBlogPost(limit: 50, sort: {fields: data___publish_date, order: DESC}) {
        nodes {
            uid
            data {
                publish_date
                title {
                    text
                }
            }
        }
    }
}
`