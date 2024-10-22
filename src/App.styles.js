import styled, { createGlobalStyle } from "styled-components";
import poppins from './assets/Poppins-Regular.ttf';
import back from './assets/back.jpeg';

export const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: poppins;
    src: url(${poppins});
}

body {
    font-family: poppins;
    margin: 10px;
    padding: 0;
    background-color: #f0f0f0;
    background-image: url(${back});
    }
    `;
