import { DefaultTheme, createGlobalStyle } from 'styled-components'

export const COLORS = {
    text: {
        dark: '#333',
        light: '#aaa',
        highlight: '#f0f0f0',
        red: 'rgba(255, 82, 82, 0.87)',
    },
    background: {
        gray: '#eee'
    },
    highlight: {
        dark: '#333',
        red: 'rgba(255, 82, 82, 0.40)',
    }
};

export const GlobalStyles = createGlobalStyle`

    :root {
        --page-max-width: max(calc(100vw - 40px), 300px);
    }

    @media (min-width: ${props => props.theme.width.phone}) {
        :root {
            --page-max-width: min(70vw, 700px);
        }
    }

    html {
        scroll-behavior: smooth;
        background: ${COLORS.background.gray};
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"!important;
        text-rendering: optimizeLegibility!important;
        font-feature-settings: "kern" 1!important;
        font-kerning: normal!important;
        min-width: 320px!important;
    }

    /** Disable link color */
    a, a:hover, a:visited, a:active {
        color: inherit;
    }

    ::selection {
        background: ${COLORS.highlight.dark};
        color: ${COLORS.text.highlight};
    }

    :target {
        background: ${COLORS.highlight.dark};
        color: ${COLORS.text.highlight};
    }
`

const Theme: DefaultTheme = {
    colors: {
        mainText: COLORS.text.dark,
        redText: COLORS.text.red,
    },
    width: {
        tablet: `860px`,
        phone: `460px`
    }
}

export { Theme }