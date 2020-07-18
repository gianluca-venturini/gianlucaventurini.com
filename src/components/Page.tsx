import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Theme } from "./Theme";
import { Reset } from 'styled-reset'

export const PageContainer = styled.div`
    color: ${props => props.theme.colors.mainText};

    display: grid;
    grid-template-columns: 40px auto 40px;
    grid-template-rows: 50px auto 50px;
`;

export const ContentContainer = styled.div`
    grid-column: 2;
    grid-row: 2;
    justify-self: center;

    line-height: 1.4;
    max-width: 600px;
`;

export const Page: React.FC = props => {
    return (
        <ThemeProvider theme={Theme}>
            <Reset />
            <PageContainer>
                <ContentContainer>
                    {props.children}
                </ContentContainer>
            </PageContainer>
        </ThemeProvider>
    );
}
