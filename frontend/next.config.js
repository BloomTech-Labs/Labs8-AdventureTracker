// next.config.js
const {parsed: localEnv} = require("dotenv").config();
const withPlugins = require("next-compose-plugins");
const path = require("path");
const webpack = require("webpack");
const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const withTypescript = require("@zeit/next-typescript");
const withImages = require("next-images");
const tsConfig = {};
const cssConfig = {};
const lessConfig = {};
const imagesConfig = {};
//https://github.com/cyrilwanner/next-compose-plugins

const nextConfig = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname),
    ];
    return config;
  },
  serverRuntimeConfig: {
    //will only be available on the server side
  },
  publicRuntimeConfig: {
    // will be available on both server and client
    GOOGLE_MAPS_API_KEY: localEnv.GOOGLE_MAPS_API_KEY,
  },
};
module.exports = withPlugins(
  [
    [withCSS, cssConfig],
    [withLess, lessConfig],
    [withTypescript, tsConfig],
    [withImages, imagesConfig],
  ],
  nextConfig,
);
