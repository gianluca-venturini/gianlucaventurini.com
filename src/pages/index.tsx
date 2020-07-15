import { graphql, PageProps } from "gatsby";
import React from "react";

export default function IndexPage(props: PageProps) {
    console.log(JSON.stringify(props.data));
    return <div>Gianluca Venturini</div>;
}

export const IndexQuery = graphql`
    query Articles {
        articles: allPrismicArticle {
            edges {
                node {
                    slugs
                    data {
                        title {
                            text
                        }
                        image {
                            url
                        }
                    }
                }
            }
        }
    }
`