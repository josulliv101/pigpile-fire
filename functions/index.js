const functions = require('firebase-functions');
const app = require('express')();
var wepay = require('wepay').WEPAY;

var wepay_settings = {
    'client_id'     : '128805',
    'client_secret' : '0c60f9e692',
    'access_token'  : 'STAGE_a016e32cdaf17aebc09006a18c8fd6ceb9fd95d5741886130d127bb90a2e70d0', // used for oAuth2
    // 'api_version': 'API_VERSION'
}

var wp = new wepay(wepay_settings);
wp.use_staging();

const checkout = require('express')();

const admin = require('firebase-admin');
//
const db = require('./db-firestore');
const render = require('./render');

admin.initializeApp(functions.config().firebase);

checkout.get('/favicon.ico', function(req, res) {
  res.sendStatus(204)
});

checkout.get('/checkout', (req, res) => {
  console.log('CHECKOUT')
  wp.call('/checkout/create',
      {
          'account_id': 11959731,
          'amount': 5,
          'currency': 'USD',
          'short_description': 'A donation',
          'type': 'goods',
          'fee': {
            'fee_payer': 'payee'
          },
          'hosted_checkout': {
            'mode': 'iframe'
          }
      },
      function(response) {
          console.log('%s', response);
          res.send(response);
      }
  );

});

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


exports.createCheckout = functions.firestore.document('checkouts/{userId}').onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    var newValue = event.data.data();
    console.log('EVENT createCheckout', event.params)
    // access a particular field as you would any JS property
    var amount = newValue.amount || 0;

    const prom = new Promise(function (resolve) {

      wp.call('/checkout/create',
          {
              'account_id': 11959731,
              'amount': amount,
              'currency': 'USD',
              'short_description': 'A donation',
              'type': 'goods',
              'fee': {
                'fee_payer': 'payee'
              },
              'hosted_checkout': {
                'mode': 'iframe'
              }
          },
          function(resp) {
              console.log('%s', resp);
              var checkout_uri = resp  && resp.hosted_checkout && resp.hosted_checkout.checkout_uri
              event.data.ref.update({
                checkout_uri: checkout_uri
              });
              resolve({success: true, checkout_uri: checkout_uri})
          }
      );
    })

    // Then return a promise of a set operation to update the count
    return prom
});


exports.app = functions.https.onRequest(app);
exports.checkout = functions.https.onRequest(checkout);
