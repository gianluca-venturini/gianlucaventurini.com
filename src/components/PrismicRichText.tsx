import { RichText, RichTextBlock } from 'prismic-reactjs';
import React from 'react';

export interface PrismicRichTextProps {
    raw: RichTextBlock[];
}

export const PrismicRichText = (props: PrismicRichTextProps) => {
    const renderProp = props.raw.map(r => ({
        spans: [], // Need to add this because Prismic service is not always populating it
        ...r
    })) as any;
    return <RichText render={renderProp} />;
}