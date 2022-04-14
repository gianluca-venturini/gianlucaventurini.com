import { graphql, PageProps } from "gatsby";
import React from "react";
import { PrismicRichTextProps } from "../components/PrismicRichText";
import { Page } from "../components/Page";
import styled from "styled-components";
import { DESCRIPTION_320 } from "../components/Constants";
import { PrismicTitle } from "../components/PrismicTitle";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const Content = styled.div`
    display: grid;
    row-gap: 20px;
`;

export const BookContainer = styled.div`
    cursor: pointer;
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
            title: { text: string },
            body: {
                items: {
                    book_author: { text: string };
                    book_title: { text: string };
                }[];
            }[]
        }
    }
}

export default function BookshelfPage(props: PageProps<BookshelfData>) {
    return (
        <Page title="Bookshelf · Gianluca Venturini" description={DESCRIPTION_320} location={props.location}>
            <Content>
                <PrismicTitle text={props.data.prismicBookshelf.data.title.text} />
                {props.data.prismicBookshelf.data.body[0].items.map(book => (
                    <CopyToClipboard text={getBookUrl(book.book_title.text)} key={book.book_title.text} onCopy={() => typeof window !== `undefined` && window.location.replace(getBookPath(book.book_title.text)) }>
                        <BookContainer id={getBookAnchor(book.book_title.text)}>
                            <span>
                                <BookTitle>{book.book_title.text}</BookTitle>
                                <BookAuthor>{book.book_author.text}</BookAuthor>
                            </span>
                        </BookContainer>
                    </CopyToClipboard>
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
                    ... on PrismicBookshelfDataBodyBook {
                        items {
                            book_author {
                                text
                            }
                            book_title {
                                text
                            }
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