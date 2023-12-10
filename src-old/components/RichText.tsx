import { PrismicRichText } from "@prismicio/react";

import * as React from "react";
import { Typography, FONTS } from "./Typography";
import { GUTTERS } from "./Styles";
import styled from "styled-components";
import { Code } from "./Code";
import { Image } from "./Image";
import { renderEmbedType } from "./RichTextUtil";
import { COLORS } from "./Theme";

export type RichTextField = any;

const Strong = styled.span`
    font-weight: 700!important;

    * {
        font-weight: inherit;
    }
`;

const WrappedLink = styled.a`
    text-decoration: none;

    span {
        span {
            box-shadow: inset 0 -0.4em 0 0 ${COLORS.highlight.red}, 0 0.25em 0 0 ${COLORS.highlight.red};
            &:hover {
                box-shadow: inset 0 -1.2em 0 0 ${COLORS.highlight.red}, 0 0.25em 0 0 ${COLORS.highlight.red};
            }
        
            transition: box-shadow 0.3s;
        }
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
                    <Image dimensions={node.dimensions} url={node.url} alt={node.alt} description={node.alt} />
                ),
                heading1: ({ text }) => <Typography variant={FONTS.title.macro} style={{ marginTop: GUTTERS.large}}>{text}</Typography>,
                heading2: ({ text }) => <Typography variant={FONTS.title.xlarge} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading3: ({ text }) => <Typography variant={FONTS.title.large} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading4: ({ text }) => <Typography variant={FONTS.title.medium} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                heading5: ({ text }) => <Typography variant={FONTS.title.small} style={{ marginTop: GUTTERS.medium}}>{text}</Typography>,
                span: ({ text }) => <Typography variant={FONTS.body.medium} component="span">{text}</Typography>,
                oList: ({ children }) => <ol type="1" style={{ marginTop: GUTTERS.medium}}>{children}</ol>,
                list: ({ children }) => <ul style={{ marginTop: GUTTERS.medium}}>{children}</ul>,
                listItem: ({ children }) => <li style={{ marginLeft: 16, listStyleType: 'disc' }}>{children}</li>,
                oListItem: ({ children }) => <li style={{ marginLeft: 16, listStyleType: 'decimal' }}>{children}</li>,
                strong: ({ children }) => <Strong>{children}</Strong>,
                preformatted: ({ text }) => (
                    <>
                        {renderEmbedType(text, {
                            code: rawCode => {
                                const [language, ...rest] = rawCode.split('\n');
                                const code = rest.join('\n');
                                return (
                                    <Code language={language} style={{ marginTop: GUTTERS.medium}}>{code}</Code>
                                )
                            },
                            video: (video, format) => <video loop autoPlay playsInline muted style={{ marginTop: GUTTERS.medium, maxWidth: '100%' }}><source src={video} type={`video/${format}`}/></video>,
                        })}
                    </>
                ),
                hyperlink: ({ children, node }) => (
                    <WrappedLink
                        href={node.data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {children}
                    </WrappedLink>
                )
            }}
        />
    );
}