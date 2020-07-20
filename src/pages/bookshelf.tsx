import { graphql, PageProps } from "gatsby";
import React from "react";
import { PrismicRichTextProps, PrismicRichText } from "../components/PrismicRichText";
import { Page } from "../components/Page";
import styled from "styled-components";
import { DESCRIPTION_320 } from "../components/Constants";
import { PrismicTitle } from "../components/PrismicTitle";

export const Content = styled.div`
    display: grid;
    row-gap: 50px;
`;

export const Book = styled.div`
    display: grid;
    row-gap: 10px;
`;

interface HomeData {
    prismicBookshelf: {
        data: {
            title: {text: string}[],
            body: {
                items: {
                    book_description: PrismicRichTextProps['raw'];
                    book_title: PrismicRichTextProps['raw'];
                }[];
            }[]
        }
    }
}

export default function BookshelfPage(props: PageProps<HomeData>) {
    console.log(props);
    return (
        <Page title="Bookshelf · Gianluca Venturini" description={DESCRIPTION_320} location={props.location}>
            <Content>
                <PrismicTitle {...props.data.prismicBookshelf.data.title} />
                {props.data.prismicBookshelf.data.body[0].items.map(book => (
                    <Book key={book.book_title[0].text}>
                        <PrismicRichText raw={book.book_title} />
                        <div style={{fontWeight: 200}}><PrismicRichText raw={book.book_description} /></div>
                    </Book>
                ))}
            </Content>
        </Page>
    );
}

export const IndexQuery = graphql`
    query Bookshelf {
        prismicBookshelf {
            data {
                body {
                    items {
                        book_description {
                            text
                            type
                        }
                        book_title {
                            text
                            type
                        }
                    }
                }
                title {
                    text
                }
            }
        }
    }
    
  
`