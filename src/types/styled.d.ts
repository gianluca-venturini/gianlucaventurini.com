// import original module declarations
import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            mainText: string;
            redText: string;
        };
        width: {
            tablet: string;
        }
    }
}