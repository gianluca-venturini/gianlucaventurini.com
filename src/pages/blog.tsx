import { graphql, PageProps, Link } from "gatsby";
import React from "react";
import { Page } from "../components/Page";
import { DESCRIPTION_320 } from "../components/Constants";

interface BookshelfData {
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

 const BlogIndexPage: React.FC<PageProps<BookshelfData>> = props => {
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
    allPrismicBlogPost(limit: 10, sort: {fields: first_publication_date}) {
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

function getBookAnchor(bookTitle: string) {
    if (!bookTitle) {
        return null;
    }
    return bookTitle.toLowerCase().replace(/\ /g, '-');
}

function getBookUrl(bookTitle: string) {
    if (typeof window === `undefined`) {
        return '';
    }
    const url = new URL(window.location.href);
    return `${url.protocol}://${url.host}${url.pathname}#${getBookAnchor(bookTitle)}`
}

function getBookPath(bookTitle: string) {
    if (typeof window === `undefined`) {
        return '';
    }
    const url = new URL(window.location.href);
    return `${url.pathname}#${getBookAnchor(bookTitle)}`
}