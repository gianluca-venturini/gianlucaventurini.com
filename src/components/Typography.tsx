import React from 'react';
import styled, { css } from 'styled-components';
import { GUTTERS, BREAKPOINTS } from './Styles';

export type FontVariant = {
    component?: string;
    letterSpacing: number;
    lineHeight: number;
    size: number;
    weight: number;
    textTransform?: string;
};

export const FONTS = {
    title: {
        giga: {
            component: 'h1',
            letterSpacing: 0,
            lineHeight: 1.1,
            size: 47,
            weight: 600,
        },
        macro: {
            component: 'h2',
            letterSpacing: 0,
            lineHeight: 1.1,
            size: 35,
            weight: 600,
        },
        xlarge: {
            component: 'h3',
            letterSpacing: 0,
            lineHeight: 1.1,
            size: 26,
            weight: 600,
        },
        large: {
            component: 'h4',
            letterSpacing: 0,
            lineHeight: 1.2,
            size: 20,
            weight: 600,
        },
        medium: {
            component: 'h5',
            letterSpacing: 0,
            lineHeight: 1.2,
            size: 18,
            weight: 400,
        },
        small: {
            component: 'h6',
            letterSpacing: 0,
            lineHeight: 1.2,
            size: 16,
            weight: 600,
        },
    },
    label: {
        giga: {
            component: 'span',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 25,
            weight: 600,
        },
        macro: {
            component: 'span',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 17,
            weight: 600,
        },
        xlarge: {
            component: 'span',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 15,
            weight: 400,
        },
        large: {
            component: 'span',
            letterSpacing: 0.1,
            lineHeight: 1.3,
            size: 14,
            textTransform: 'uppercase',
            weight: 500,
        },
        medium: {
            component: 'span',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 13,
            weight: 500,
        },
        small: {
            component: 'span',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 12,
            weight: 500,
        },
        xsmall: {
            component: 'span',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 11,
            weight: 600,
        },
        micro: {
            component: 'span',
            letterSpacing: -0.2,
            lineHeight: 1.3,
            size: 11,
            weight: 500,
        },
        nano: {
            component: 'span',
            letterSpacing: 0.06,
            lineHeight: 1.3,
            size: 10,
            textTransform: 'uppercase',
            weight: 500,
        },
    },
    body: {
        giga: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.2,
            size: 32,
            weight: 400,
        },
        macro: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.3,
            size: 24,
            weight: 400,
        },
        xlarge: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.5,
            size: 18,
            weight: 400,
        },
        large: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.5,
            size: 16,
            weight: 400,
        },
        medium: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.5,
            size: 15,
            weight: 400,
        },
        small: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.6,
            size: 12,
            weight: 400,
        },
        xsmall: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.6,
            size: 13,
            weight: 400,
        },
        micro: {
            component: 'p',
            letterSpacing: 0,
            lineHeight: 1.6,
            size: 11,
            weight: 400,
        },
    },
};

export interface TypographyProps {
    align?: 'left' | 'center' | 'right';
    color?: string;
    component?: string;
    id?: string;
    maxWidth?: number;
    style?: React.CSSProperties;
    variant: FontVariant;
    noDecoration?: boolean;
    children?: React.ReactNode;
}

const Wrapper = styled.span`
    font-size: 10%;
    
    @media (min-width: ${BREAKPOINTS.mobile}px) {
        font-size: calc((100vw + 800px) / 2000);
    }
`;

const Font = styled.span<TypographyProps>`
    color: ${props => props.color};
    margin: 0;
    padding: 0;

    ${props =>
        props.align &&
        css`
            text-align: ${props.align};
        `}

    ${props =>
        props.maxWidth &&
        css`
            max-width: ${props.maxWidth}px;
        `}

    ${props =>
        props.variant &&
        css`
            font-size: ${props.variant.size}em;
            line-height: ${props.variant.lineHeight};
            font-weight: ${props.variant.weight};

            ${props.variant.letterSpacing &&
            css`
                letter-spacing: ${props.variant.letterSpacing}em;
            `}

        ${props.variant.textTransform &&
            css`
                text-transform: ${props.variant.textTransform};
            `}
        `}

    ${props => 
        props.noDecoration && css`text-decoration: none;`
    }
`;

export const Typography: React.FC<TypographyProps> = props => {
    const { align, color, component, children, id, maxWidth, style, variant, ...rest } = props;

    return (
        <Wrapper>
            <Font
                align={align}
                as={component ?? variant.component as any}
                color={color}
                id={id}
                maxWidth={maxWidth}
                style={style}
                variant={variant}
                {...rest}
            >
                {children}
            </Font>
        </Wrapper>
    );
};
