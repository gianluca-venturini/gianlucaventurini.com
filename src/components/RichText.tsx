import { PrismicRichText } from "@prismicio/react";

import React from "react";
import { Typography, FONTS } from "./Typography";

export type RichTextField = any;

interface RichTextProps {
    richText: RichTextField;
}

export const RichText: React.FC<RichTextProps> = ({ richText }) => {
    return (
        <PrismicRichText
            field={richText}
            components={{
                paragraph: ({ children }) => <p>{children}</p>,
                image: ({ node }) => <img style={{ maxWidth: 600 }} src={node.url} alt={node.alt} />,
                heading1: ({ text }) => <Typography variant={FONTS.title.giga}>{text}</Typography>,
                heading2: ({ text }) => <Typography variant={FONTS.title.macro}>{text}</Typography>,
                heading3: ({ text }) => <Typography variant={FONTS.title.xlarge}>{text}</Typography>,
                heading4: ({ text }) => <Typography variant={FONTS.title.large}>{text}</Typography>,
                heading5: ({ text }) => <Typography variant={FONTS.title.medium}>{text}</Typography>,
                span: ({ text }) => <Typography variant={FONTS.body.medium} component="span">{text}</Typography>,
            }}
        />
    );
}