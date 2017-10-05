const functions = require('firebase-functions');
const app = require('express')();
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const ServerApp = React.createFactory(require('./build/server.bundle.js').default);

const renderApplication = (url, res, initialState = {}) => {
  const html = ReactDOMServer.renderToString(ServerApp({url: url, context: {}, initialState}));
  res.send(html);
};

app.get('/favicon.ico', function(req, res) {
  res.send(204);
});

app.get('/:userId?', (req, res) => {
  res.set('Cache-Control', 'public, max-age=60, s-maxage=180');
  renderApplication(req.url, res, {foo: "bar"});
});

exports.app = functions.https.onRequest(app);
