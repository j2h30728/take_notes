import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html,
body,
div,
span,
h1,
h2,
h3,
h4,
h5,
h6,
input,
p {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
* {
  box-sizing: border-box;
  }
button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }

body {
  line-height: 1;
  font-weight: 400;
  margin: 0 auto;
}
`;

export default GlobalStyle;
