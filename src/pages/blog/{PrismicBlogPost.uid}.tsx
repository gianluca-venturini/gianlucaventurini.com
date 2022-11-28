import { graphql, PageProps } from "gatsby";
import React from "react";
import { DESCRIPTION_320 } from "../../components/Constants";
import { Page } from "../../components/Page";
import { RichText, RichTextField } from "../../components/RichText";
import { Typography, FONTS } from "../../components/Typography";


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
            <Typography variant={FONTS.title.giga}>{props.data.prismicBlogPost.data.title.text}</Typography>
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
