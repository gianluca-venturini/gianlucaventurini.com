import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

export interface PrismicRichTextProps {
    raw: RichTextBlock[];
}

export const PrismicRichText = (props: PrismicRichTextProps) => {
    return <RichText render={props.raw as any} />;
}