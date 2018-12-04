import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Clipboard extends React.Component {
  render() {
    const url = window.location.href;
    return (
      <CopyToClipboard text={url}>
        <button>Copy URL to the clipboard</button>
      </CopyToClipboard>
    );
  }
}
export default Clipboard;
