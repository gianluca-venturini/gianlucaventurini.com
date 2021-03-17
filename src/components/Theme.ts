import { DefaultTheme, createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern" 1;
        font-kerning: normal;
        min-width: 320px;
    }

    ::selection {
        background: rgba(255, 82, 82, 0.1);
    }
`

const Theme: DefaultTheme = {
    colors: {
        mainText: `rgba(0, 0, 0, 0.75)`,
        redText: `rgba(255, 82, 82, 0.87)`
    },
    width: {
        tablet: `860px`,
        phone: `460px`
    }
}

export { Theme }