import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal, withTheme } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  black: '#2E2E2E',
  brown: '#973f00',
  orange: '#EA6200',
  white: '#E9E9E9',
  red: '#D10000',
  opacityblack: 'rgba(29,27,27,51%)'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 4rem;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
`;

// withTheme allows all pages to have access to theme prop
const StyledPageWithTheme = withTheme(StyledPage);
class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPageWithTheme>{this.props.children}</StyledPageWithTheme>
      </ThemeProvider>
    );
  }
}

export default Page;
