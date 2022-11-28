import { graphql, PageProps } from "gatsby";
import React from "react";
import { DESCRIPTION_320 } from "../../components/Constants";
import { Page } from "../../components/Page";
import { RichText, RichTextField } from "../../components/RichText";


interface BlogPostData {
    prismicBlogPost: {
        uid: string;
        data: {
            title: { text: string },
            body: { richText: RichTextField }
        }
    }
}

export default function BlogPostPage(props: PageProps<BlogPostData>) {
    return (
        <Page title="Blog" description={DESCRIPTION_320} location={props.location}>
            <h1>{props.data.prismicBlogPost.data.title.text}</h1>
            <RichText richText={props.data.prismicBlogPost.data.body.richText} />
        </Page>
    );
}

export const IndexQuery = graphql`
    query BlogPost($uid: String!) {
        prismicBlogPost(uid: {eq: $uid }) {
            uid
            data {
                body {
                    richText
                }
                title {
                    text
                }
            }
        }
    }
`
