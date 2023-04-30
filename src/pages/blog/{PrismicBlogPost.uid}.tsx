import { graphql, PageProps } from "gatsby";
import React from "react";
import { Image } from "../../components/Image";
import { Page } from "../../components/Page";
import { RichText, RichTextField } from "../../components/RichText";
import { Typography, FONTS } from "../../components/Typography";
import { GUTTERS } from "../../components/Styles";
import { COLORS } from "../../components/Theme";


interface BlogPostData {
    prismicBlogPost: {
        uid: string;
        data: {
            publish_date: string;
            title: { text: string };
            description: { text: string };
            cover: { url: string, alt: string, dimensions: { width: number, height: number } };
            body: { richText: RichTextField };
        };
    };
}

export default function BlogPostPage(props: PageProps<BlogPostData>) {
    return (
        <Page title={props.data.prismicBlogPost.data.title.text} description={props.data.prismicBlogPost.data.title.text} image={props.data.prismicBlogPost.data.cover} location={props.location}>
            <Typography variant={FONTS.label.large} style={{ marginBottom: GUTTERS.large, color: COLORS.text.light }}>{props.data.prismicBlogPost.data.publish_date}</Typography>
            <Typography variant={FONTS.title.giga} style={{ marginBottom: GUTTERS.large }}>{props.data.prismicBlogPost.data.title.text}</Typography>
            <Image url={props.data.prismicBlogPost.data.cover.url} alt={props.data.prismicBlogPost.data.cover.alt} dimensions={props.data.prismicBlogPost.data.cover.dimensions} />
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
                cover {
                    url
                    alt
                    dimensions {
                        width
                        height
                    }
                }
                body {
                    richText
                }
                title {
                    text
                }
                description {
                    text
                }
            }
        }
    }
`
