const functions = require('firebase-functions');
const serialize = require('serialize-javascript');
const CleanCSS = require('clean-css');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {ServerApp, getSheetsRegistry} = require('./build/server.bundle.js');
// const ServerApp = require('./build/server.bundle.js').default;
const template = require('./template');
//
const App = React.createFactory(ServerApp);
const SheetsRegistry = getSheetsRegistry();

// const ServerApp = require('./build/server.bundle.js').default;

console.log('getSheetsRegistry', ServerApp, getSheetsRegistry)

module.exports = (url, res, initialState) => {
  const sheets = new SheetsRegistry();
  const props = {
    context: {},
    initialState,
    sheets,
    url,
  };

  const html = ReactDOMServer.renderToString(App(props));
  const templatedHtml = template({
    assets: functions.config().assets,
    body: html,
    css: new CleanCSS({}).minify(sheets.toString()).styles,
    initialState: serialize(initialState),
  });
  res.send(templatedHtml);
};
