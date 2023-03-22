import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, coldarkDark, duotoneDark, vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeProps {
    children: string;
    style: React.CSSProperties;
}

const CIRCLE_STYLE: React.CSSProperties = {
    display: 'block',
    width: 12,
    height: 12,
    borderRadius: '50%',
};

vscDarkPlus.comment.color = 'rgb(113, 113, 113)';

export const Code: React.FC<CodeProps> = ({ children, style }) => {
    return (
        <div style={{ 
            background: 'rgb(30, 30, 30)',
            color: 'rgb(219, 219, 174)',
            borderRadius: 6,
            overflow: 'hidden',
            border: 'solid 0.5px rgb(113, 113, 113)',
            boxShadow: '0 0 20px 4px rgba(0, 0, 0, 0.56)',
            ...style,
        }}>
            <div style={{ background: 'rgb(50, 50, 51)', display: 'flex', alignItems: 'center', padding: 8, gap: 6 }}>
                <div style={{ ...CIRCLE_STYLE, background: 'rgb(237, 106, 94)' }} />
                <div style={{ ...CIRCLE_STYLE, background: 'rgb(245, 191, 79)' }}></div>
                <div style={{ ...CIRCLE_STYLE, background: 'rgb(97, 197, 84)' }}></div>
            </div>
            <SyntaxHighlighter 
                showLineNumbers
                useInlineStyles
                // wrapLongLines
                language="typescript"
                style={vscDarkPlus}
                customStyle={{
                    fontSize: 12,
                    padding: '10px 0 20px',
                    borderRadius: 0,
                    background: null,
                }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    )
};