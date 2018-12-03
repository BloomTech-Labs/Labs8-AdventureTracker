import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard

// render() {
//     // Or if you prefer, you can use react-router API
//     const url = window.location.href
  
//     <CopyToClipboard text={url}>
//       <button>Copy URL to the clipboard</button>
//     </CopyToClipboard>
//   }


// class Clipboard extends React.Component {
//     constructor() {
//       super();
//       this.copy = this.copy.bind(this);
//     }
  
//     copy() {
//       this.elRef.select();
//       document.execCommand("copy");
//     }
//     // const url = window.location.href
//     render() {
        
//        return (
//         //   <CopyToClipboard text={url}>
//         //    <button>Share Trip</button>
//         //   </CopyToClipboard>

//         <div>
//           <input id="url-input" ref={el => this.elRef = el} value={this.props.url} />
//           <button onClick={this.copy}>Copy</button>
//         </div>
//        )
//     }
//   }

//   class Clipboard extends React.Component {
//     constructor() {
//       super();
//       this.copy = this.copy.bind(this);
//     }
  
//     copy() {
//       const el = document.createElement('input');
//       el.value = this.props.url;
//       el.id = "url-input";
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand("copy");
//       el.remove();
//     }
  
//     render() {
//       return <button onClick={this.copy}>Share Trip</button>
//     }
//   }
  

//   export default Clipboard;