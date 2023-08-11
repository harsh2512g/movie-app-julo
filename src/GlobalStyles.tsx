import { Global, css } from '@emotion/react';

const globalStyles = css`
  body {
    background-color: #000;
    color: #fff;
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', sans-serif;
  }
`;

const GlobalStyles: React.FC = () => <Global styles={globalStyles} />;

export default GlobalStyles;
