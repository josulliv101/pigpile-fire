const functions = require('firebase-functions');
const app = require('express')();
const admin = require('firebase-admin');
//
const db = require('./db-firestore');
const render = require('./render');

admin.initializeApp(functions.config().firebase);

app.get('/favicon.ico', function(req, res) {
  res.sendStatus(204)
});

app.get('/:userId?', (req, res) => {

  const id = req.params && req.params.userId;
  res.set('Cache-Control', 'public, max-age=60, s-maxage=180');

  if (id) {
  	if (id === 'login') {
  		console.log('&&&', req.query)
  		render(req.url, res, {settings: {handlingAuthRedirect: req.query.redirect === '1'}});
  		return
  	}
    Promise.all([
      db.getPileWithTheme({api: admin, id}),
      db.getPileDonations(admin, id),
    ]).then(
      function ([pile, snapshot]) {
	    render(req.url, res, {
	      settings: {
	        [`pile-${id}`]: pile,
	        [`pile-${id}-donations`]: snapshot.docs.map(d => d.data()),
	      },
	      theme: { active: pile.themeObj}
	    });
      },
      function(e) {
        console.log('err', e)
        render(req.url, res, {});
      }
    )
  } else {
    db.getTrending({api: admin}).then(function (snapshot) {
        const trending = snapshot.docs.map(doc => doc.data());
        console.log('snapshot', snapshot.size)
        render(req.url, res, {settings: {trending}});
      }, function(e) {
        console.log('err', e)
        render(req.url, res, {});
      })
  }

});

exports.app = functions.https.onRequest(app);
