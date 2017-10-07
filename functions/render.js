const functions = require('firebase-functions');
const serialize = require('serialize-javascript');
const CleanCSS = require('clean-css');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
//
const {ServerApp, getSheetsRegistry} = require('./build/server.bundle.js');
const template = require('./template');

const App = React.createFactory(ServerApp);
const SheetsRegistry = getSheetsRegistry();

module.exports = (url, res, initialState) => {
  const sheets = new SheetsRegistry();
  const html = ReactDOMServer.renderToString(App({
    context: {},
    initialState,
    sheets,
    url,
  }));
  const templatedHtml = template({
    assets: functions.config().assets,
    body: html,
    css: new CleanCSS({}).minify(sheets.toString()).styles,
    initialState: serialize(initialState),
  });
  res.send(templatedHtml);
};
