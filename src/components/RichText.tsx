import { PrismicRichText } from "@prismicio/react";

import React from "react";

export type RichTextField = any;

interface RichTextProps {
    richText: RichTextField;
}

export const RichText: React.FC<RichTextProps> = ({ richText }) => {
    return (
        <PrismicRichText
            field={richText}
            components={{
                paragraph: ({ children }) => <blockquote>{children}</blockquote>,
            }}
        />
    );
}