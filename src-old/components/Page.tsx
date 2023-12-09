import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Theme, GlobalStyles } from "./Theme";
import { Reset } from 'styled-reset'
import { MetaProps, Meta } from "./Meta";
import { Navigation, NavigationProps } from "./Navigation";
import { AUTHOR } from "./Constants";

export const PageContainer = styled.div`
    color: ${props => props.theme.colors.mainText};
    
    display: grid;

    grid-template-columns: 20px auto 20px;
    grid-template-rows: 50px auto 50px;

    @media (min-width: ${props => props.theme.width.phone}) {
        grid-template-columns: 40px auto 40px;
    }
`;

export const ContentContainer = styled.div`
    max-width: var(--page-max-width);

    grid-column: 2;
    grid-row: 2;
    justify-self: center;

    font-size: 14px;
    line-height: 1.6;
    overflow-wrap: break-word;
`;

interface PageProps extends MetaProps, NavigationProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Page: React.FC<PageProps> = props => {

    return (
        <ThemeProvider theme={Theme}>
            <Reset />
            <GlobalStyles />
            <Meta {...props} />
            <Navigation location={props.location}/>
            <PageContainer>
                <ContentContainer style={props.style}>
                    {props.children}
                </ContentContainer>
            </PageContainer>
        </ThemeProvider>
    );
}
