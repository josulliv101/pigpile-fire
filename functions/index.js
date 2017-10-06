const functions = require('firebase-functions');
var serialize = require('serialize-javascript');
const app = require('express')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const ServerApp = React.createFactory(require('./build/server.bundle.js').default);
const template = require('./template');
const assetsUrl = functions.config().assets && functions.config().assets.url;

console.log('config', functions.config().assets.url)
const renderApplication = (url, res, initialState = {}) => {
  const html = ReactDOMServer.renderToString(ServerApp({url: url, context: {}, initialState}));
  const templatedHtml = template({assetsUrl, body: html, initialState: serialize(initialState)});
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
