import { graphql, PageProps, Link } from "gatsby";
import React from "react";
import { Page } from "../components/Page";
import { DESCRIPTION_320 } from "../components/Constants";

interface BlogIndexPageProps {
    allPrismicBlogPost: {
        nodes: [{
            uid: string,
            data: {
                title: {
                     text: string,
                }
            }
        }]
    }
}

 const BlogIndexPage: React.FC<PageProps<BlogIndexPageProps>> = props => {
    return (
        <Page title="Blog" description={DESCRIPTION_320} location={props.location}>
            {props.data.allPrismicBlogPost.nodes.map(blogPost => (
                <Link to={`/blog/${blogPost.uid}`}><h2>{blogPost.data.title.text}</h2></Link>
            ))}
        </Page>
    );
}

export default BlogIndexPage;

export const IndexQuery = graphql`
query BlogPosts {
    allPrismicBlogPost(limit: 10, sort: {fields: first_publication_date, order: DESC}) {
        nodes {
            uid
            data {
                title {
                    text
                }
            }
        }
    }
}
`