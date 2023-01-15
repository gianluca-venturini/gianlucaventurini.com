import { graphql, PageProps } from "gatsby";
import React from "react";
import { DESCRIPTION_320 } from "../../components/Constants";
import { Page } from "../../components/Page";
import { RichText, RichTextField } from "../../components/RichText";
import { Typography, FONTS } from "../../components/Typography";
import { GUTTERS } from "../../components/Styles";
import { COLORS } from "../../components/Theme";


interface BlogPostData {
    prismicBlogPost: {
        uid: string;
        data: {
            publish_date: string,
            title: { text: string },
            body: { richText: RichTextField }
        }
    }
}

export default function BlogPostPage(props: PageProps<BlogPostData>) {
    return (
        <Page title="Blog" description={DESCRIPTION_320} location={props.location}>
            <Typography variant={FONTS.label.large} style={{ marginBottom: GUTTERS.large, color: COLORS.text.light }}>{props.data.prismicBlogPost.data.publish_date}</Typography>
            <Typography variant={FONTS.title.giga} style={{ marginBottom: GUTTERS.large }}>{props.data.prismicBlogPost.data.title.text}</Typography>
            <RichText richText={props.data.prismicBlogPost.data.body.richText} />
        </Page>
    );
}

export const IndexQuery = graphql`
    query BlogPost($uid: String!) {
        prismicBlogPost(uid: {eq: $uid }) {
            uid
            data {
                publish_date
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
