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

export const BookTitle = styled.span`
    * {
        display: inline-block;
    }
`;

export const BookAuthor = styled.span`
    margin-left: 6px;
    display: inline-block;
    font-weight: 200;
    font-size: 12px;
`;

interface BookshelfData {
    prismicBookshelf: {
        data: {
            title: { text: string }[],
            body: {
                items: {
                    book_description: PrismicRichTextProps['raw'];
                    book_author: PrismicRichTextProps['raw'];
                    book_title: PrismicRichTextProps['raw'];
                }[];
            }[]
        }
    }
}

export default function BookshelfPage(props: PageProps<BookshelfData>) {
    return (
        <Page title="Bookshelf · Gianluca Venturini" description={DESCRIPTION_320} location={props.location}>
            <Content>
                <PrismicTitle {...props.data.prismicBookshelf.data.title} />
                {props.data.prismicBookshelf.data.body[0].items.map(book => (
                    <div key={book.book_title[0].text}>
                        <span>
                            <BookTitle><PrismicRichText raw={book.book_title} /></BookTitle>
                            <BookAuthor><PrismicRichText raw={book.book_author} /></BookAuthor>
                        </span>
                    </div>
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
                        book_author {
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