const functions = require('firebase-functions');
var serialize = require('serialize-javascript');
const app = require('express')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { JssProvider, SheetsRegistry } = require('react-jss')

const ServerApp = React.createFactory(require('./build/server.bundle.js').default);
const template = require('./template');
const sheetsRegistry = new SheetsRegistry();
const assetsUrl = functions.config().assets && functions.config().assets.url;

console.log('config', functions.config())
const renderApplication = (url, res, initialState = {}) => {
  const html = ReactDOMServer.renderToString(ServerApp({context: {}, initialState, JssProvider, sheetsRegistry, url}));
  
  // Render needs to happen before this step
  const css = sheetsRegistry.toString()

  const templatedHtml = template({assetsUrl, body: html, css, initialState: serialize(initialState)});
  res.send(templatedHtml);
};

const state = {foo: "bar"};

app.get('/favicon.ico', function(req, res) {
  res.send(204);
});

app.get('/:userId?', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
  renderApplication(req.url, res, state);
});

exports.app = functions.https.onRequest(app);
