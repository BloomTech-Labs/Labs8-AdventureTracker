// Information link on how to use this file: https://jsramblings.com/2018/02/04/styled-components-media-queries.html
const size = {
  mobile: '425px',
  tablet: '768px',
  desktop: '1024px'
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.desktop})`
};
