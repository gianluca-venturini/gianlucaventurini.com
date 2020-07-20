import React from 'react';
import styled from 'styled-components';

export const TitleWrapper = styled.h1`
    font-size: 30px;
    font-weight: 100;
`;

export type PrismicPrismicTitleProps = {
    text: string
}[];

export const PrismicTitle = (props: PrismicPrismicTitleProps) => {
    return <TitleWrapper>{props[0].text}</TitleWrapper>;
}