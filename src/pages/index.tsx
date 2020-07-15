import { graphql, PageProps } from "gatsby"
import React from "react"

export default function IndexPage(props: PageProps) {
    return <h1>{JSON.stringify(props.data)}</h1>
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