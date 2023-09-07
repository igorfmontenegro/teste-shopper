import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #root{
        height: 100vh;
        width: 100vw;
    }

    body{
        font-family: Montserrat, sans-serif;
        background-color: #1E2044;
    };
`
