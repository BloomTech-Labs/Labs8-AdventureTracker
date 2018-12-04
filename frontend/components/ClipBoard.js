import React, { Component } from 'react';
import gql from 'graphql-tag';
import User, { Current_User_Query } from './User';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Clipboard extends React.Component {
  render() {
    const url = window.location.href;
    return (
      <User>
        {({ data: { me } }) => (
          <CopyToClipboard text={url + `?id=` + me.id}>
            <button>Share Trip</button>
          </CopyToClipboard>
        )}
      </User>
    );
  }
}
// https://adventure-tracker-frontend.netlify.com/app?id=xxxx
export default Clipboard;
