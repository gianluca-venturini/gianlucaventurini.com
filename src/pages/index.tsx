import { graphql, PageProps } from "gatsby";
import React from "react";
import { PrismicImage, PrismicImageProps } from "../components/PrismicImage";
import { PrismicRichTextProps, PrismicRichText } from "../components/PrismicRichText";
import { Page } from "../components/Page";
import styled from "styled-components";
import { DESCRIPTION_320 } from "../components/Constants";


export const Greetings = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 10px;
    align-items: center;
`;

export const Content = styled.div`
    display: grid;
    row-gap: 50px;
`;

interface HomeData {
    prismicHome: {
        data: {
            avatar: PrismicImageProps,
            greetings: PrismicRichTextProps,
            long_description: PrismicRichTextProps
        }
    }
}

export default function IndexPage(props: PageProps<HomeData>) {
    return (
        <Page title="Home · Gianluca Venturini" description={DESCRIPTION_320}>
            <Content>
                <Greetings>
                    <PrismicImage round {...props.data.prismicHome.data.avatar}/>
                    <PrismicRichText {...props.data.prismicHome.data.greetings}/>
                </Greetings>
                <PrismicRichText {...props.data.prismicHome.data.long_description}/>
            </Content>
        </Page>
    );
}

export const IndexQuery = graphql`
    query Home {
        prismicHome {
            data {
                avatar {
                    url
                    alt
                    dimensions {
                        height
                        width
                    }
                }
                greetings {
                    raw
                }
                long_description {
                    raw
                }
            }
        }
    }
`