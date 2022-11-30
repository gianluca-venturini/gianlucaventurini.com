import { PrismicRichText } from "@prismicio/react";

import React from "react";
import { Typography, FONTS } from "./Typography";
import { GUTTERS } from "./Styles";
import { COLORS } from "./Theme";

export type RichTextField = any;

interface RichTextProps {
    richText: RichTextField;
}

export const RichText: React.FC<RichTextProps> = ({ richText }) => {
    return (
        <PrismicRichText
            field={richText}
            components={{
                paragraph: ({ children }) => <p style={{ marginTop: GUTTERS.medium}}>{children}</p>,
                image: ({ node }) => (
                    <div style={{ marginTop: GUTTERS.medium}}>
                        <img style={{ maxWidth: 600 }} src={node.url} alt={node.alt} />
                        {!!node.alt && <Typography variant={FONTS.body.small} color={COLORS.text.light} align="center">{node.alt}</Typography>}
                    </div>
                ),
                heading1: ({ text }) => <Typography variant={FONTS.title.giga} style={{ marginTop: GUTTERS.large}}>{text}</Typography>,
                heading2: ({ text }) => <Typography variant={FONTS.title.macro} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading3: ({ text }) => <Typography variant={FONTS.title.xlarge} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading4: ({ text }) => <Typography variant={FONTS.title.large} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading5: ({ text }) => <Typography variant={FONTS.title.medium} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                span: ({ text }) => <Typography variant={FONTS.body.medium} component="span">{text}</Typography>,
                list: ({ children }) => <ul>{children}</ul>,
                listItem: ({ children }) => <li>{children}</li>,
            }}
        />
    );
}