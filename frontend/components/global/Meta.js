import Head from "next/head";

const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <link rel="stylesheet" type="text/css" href="/static/style.css" />
    <title>Adventure Tracker</title>
    <script
      type="text/javascript"
      src="node_modules/auth0-js/build/auth0.js"
    />
  </Head>
);

export default Meta;
