import { RichText, RichTextBlock, RichTextProps } from 'prismic-reactjs';
import React from 'react';

export interface PrismicRichTextProps extends RichTextProps {
    raw: RichTextBlock[];
}

export const PrismicRichText = (props: PrismicRichTextProps) => {
    const {raw, ...rest} = props;
    const renderProp = raw.map(r => ({
        spans: [], // Need to add this because Prismic service is not always populating it
        ...r
    })) as any;
    return <RichText render={renderProp} {...rest} />;
}