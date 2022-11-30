import { DefaultTheme, createGlobalStyle } from 'styled-components'

export const COLORS = {
    text: {
        primary: '#444444',
        light: '#aaa',
        red: 'rgba(255, 82, 82, 0.87)',
    }
};

export const GlobalStyles = createGlobalStyle`

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"!important;
        text-rendering: optimizeLegibility!important;
        font-feature-settings: "kern" 1!important;
        font-kerning: normal!important;
        min-width: 320px!important;
    }

    ::selection {
        background: rgba(255, 82, 82, 0.1);
    }

    :target {
        background-color: rgba(255, 82, 82, 0.1);
    }

    /** Disable link color */
    a, a:hover, a:visited, a:active {
        color: inherit;
    }

    a:hover {
        background-color: rgba(255, 82, 82, 0.2);
    }
`

const Theme: DefaultTheme = {
    colors: {
        mainText: COLORS.text.primary,
        redText: `rgba(255, 82, 82, 0.87)`
    },
    width: {
        tablet: `860px`,
        phone: `460px`
    }
}

export { Theme }