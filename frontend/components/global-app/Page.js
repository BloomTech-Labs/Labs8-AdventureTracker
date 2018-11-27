import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal, withTheme } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  black: '#2E2E2E',
  grey: '#E7E7E7',
  bordergrey: '#C8C8C8',
  darkgrey: '#525252',
  brown: '#973f00',
  lightorange: '#FF9B53',
  orange: '#EA6200',
  white: '#E9E9E9',
  red: '#D10000',
  lightred: '#FF8D8D',
  blue: '#00577D',
  lightblue: '#039ADA',
  lightgreen: '#9DFF8D',
  opacityblack: 'rgba(29,27,27,51%)',
  opacitygrey: 'rgba(71,71,71,86%)'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

injectGlobal`
  html {
    @import url('https://fonts.googleapis.com/css?family=Saira:400,700');
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
    font-family: 'Saira', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
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
