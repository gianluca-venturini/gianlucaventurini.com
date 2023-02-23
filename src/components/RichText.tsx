import { PrismicRichText } from "@prismicio/react";

import React from "react";
import { Typography, FONTS } from "./Typography";
import { GUTTERS } from "./Styles";
import { COLORS } from "./Theme";
import styled from "styled-components";

export type RichTextField = any;

const Strong = styled.span`
    font-weight: 700!important;

    * {
        font-weight: inherit;
    }
`;

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
                    <div style={{ marginTop: GUTTERS.medium, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: GUTTERS.small }}>
                        <img 
                            style={{ 
                                maxWidth: `min(${node.dimensions.width / 2}px, calc(var(--page-max-width) - 20px))`,
                                maxHeight: node.dimensions.height / 2,
                                width: 'auto',
                                height: 'auto', 
                            }} 
                            src={node.url}
                            alt={node.alt}
                        />
                        {!!node.alt && <Typography variant={FONTS.body.small} color={COLORS.text.light} align="center">{node.alt}</Typography>}
                    </div>
                ),
                heading1: ({ text }) => <Typography variant={FONTS.title.macro} style={{ marginTop: GUTTERS.large}}>{text}</Typography>,
                heading2: ({ text }) => <Typography variant={FONTS.title.xlarge} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading3: ({ text }) => <Typography variant={FONTS.title.large} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading4: ({ text }) => <Typography variant={FONTS.title.medium} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading5: ({ text }) => <Typography variant={FONTS.title.small} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                span: ({ text }) => <Typography variant={FONTS.body.medium} component="span">{text}</Typography>,
                oList: ({ children }) => <ol type="1">{children}</ol>,
                list: ({ children }) => <ul>{children}</ul>,
                listItem: ({ children }) => <li style={{ marginLeft: 16, listStyleType: 'disc' }}>{children}</li>,
                oListItem: ({ children }) => <li style={{ marginLeft: 16, listStyleType: 'decimal' }}>{children}</li>,
                strong: ({ children }) => <Strong>{children}</Strong>,
                preformatted: ({ children }) => (
                    <div 
                        style={{
                            marginTop: GUTTERS.medium,
                            whiteSpace: 'pre-wrap',
                            font: 'monospace',
                            background: COLORS.background.gray,
                            padding: GUTTERS.small,
                        }}>
                        {children}
                    </div>
                ),
            }}
        />
    );
}