import { DefaultTheme, createGlobalStyle } from 'styled-components'

export const COLORS = {
    text: {
        primary: '#444444',
        light: '#aaa',
        red: 'rgba(255, 82, 82, 0.87)',
    }
};

export const GlobalStyles = createGlobalStyle`

    :root {
        --page-max-width: 390px;
    }

    @media (min-width: ${props => props.theme.width.tablet}) {
        :root {
            --page-max-width: 600px;
        }
    }

    html {
        scroll-behavior:smooth
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
        background: black;
        color: white;
    }

    :target {
        background: black;
        color: white;
    }

    a:hover {
        background: black;
        color: white;
    }
`

const Theme: DefaultTheme = {
    colors: {
        mainText: COLORS.text.primary,
        redText: COLORS.text.red,
    },
    width: {
        tablet: `860px`,
        phone: `460px`
    }
}

export { Theme }