import { DefaultTheme, createGlobalStyle } from 'styled-components'
import InterBlack from '../fonts/Inter-Black.ttf'
import InterExtraBold from '../fonts/Inter-ExtraBold.ttf'
import InterBold from '../fonts/Inter-Bold.ttf'
import InterSemiBold from '../fonts/Inter-SemiBold.ttf'
import InterMedium from '../fonts/Inter-Medium.ttf'
import InterRegular from '../fonts/Inter-Regular.ttf'
import InterLight from '../fonts/Inter-Light.ttf'
import InterExtraLight from '../fonts/Inter-ExtraLight.ttf'
import InterThin from '../fonts/Inter-Thin.ttf'

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 900;
        src: url(${InterBlack});
        font-display: swap;
    }
    
    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 800;
        src: url(${InterExtraBold});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 700;
        src: url(${InterBold});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        src: url(${InterSemiBold});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        src: url(${InterMedium});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        src: url(${InterRegular});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 300;
        src: url(${InterLight});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 200;
        src: url(${InterExtraLight});
        font-display: swap;
    }

    @font-face {
        font-family: Inter;
        font-style: normal;
        font-weight: 100;
        src: url(${InterThin});
        font-display: swap;
    }

    body {
        font-family: Inter, sans-serif;
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern" 1;
        font-kerning: normal;
        min-width: 320px;
    }
`

const Theme: DefaultTheme = {
    colors: {
        mainText: `rgba(0, 0, 0, 0.87)`,
        redText: `rgba(255, 82, 82, 0.87)`
    }
}

export { Theme }