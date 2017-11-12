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
const checkoutCallback = require('express')();
const admin = require('firebase-admin');
//
const db = require('./db-firestore');
const render = require('./render');

admin.initializeApp(functions.config().firebase);



checkoutCallback.post('/checkoutCallback', (req, res) => {

  var uid = req.param('uid')
  var pid = req.param('pid')

  console.log('called by wepay with uid %s pid %', uid, pid)
  // console.log('checkoutCallback...', req)

  if (req.method === 'POST') {
    // const body = JSON.parse(req.body);
    // console.log('POST checkoutCallback', req.body && req.body.checkout_id)

    if (req.body && req.body.checkout_id) {
      wp.call('/checkout',
          {
              'checkout_id': req.body.checkout_id
          },
          function(response) {
              console.log('wp.call checkout : callback success.', response.state, response.checkout_id);
              if (pid && (response.state === 'released')) {
                try {
                  db.addDonation({
                    api: admin,
                    checkout_id: response.checkout_id,
                    pid: pid,
                    update: {
                      pid: pid,
                      uid: uid,
                      amount: response.amount,
                      // checkout_id: response.checkout_id,
                      createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    },
                  })

                  res.send('200');
                }

                catch(e) {
                  console.log('caught', e)
                  res.send('error');
                }

              }
              //res.send(response);
          }
      );
    }
  }


});


checkout.get('/favicon.ico', function(req, res) {
  res.sendStatus(204)
});

checkout.get('/checkout', (req, res) => {
  console.log('CHECKOUT')

  var uid = req.param('uid')
  var pid = req.param('pid')
  var amount = parseInt(req.param('amount'), 10)

  console.log('CHECKOUT...', uid, pid, amount)

  if (!uid || !pid || amount < 5) return res.send('error');

  db.getPayment({api: admin, pid: pid})
    .then(doc => {
      var payment = doc.data()
      var active = payment && payment.active && payment[payment.active]

      if (!active) return res.send('error');

      wp.call('/checkout/create',
          {
              'account_id': active.account_id,
              'amount': amount,
              'currency': 'USD',
              'short_description': 'A donation',
              'type': 'goods',
              'fee': {
                'fee_payer': 'payee'
              },
              'hosted_checkout': {
                'mode': 'iframe',
                'prefill_info': {
                    'email': 'josulliv101@gmail.com',
                    'address': {
                      'postal_code': '02138'
                    }
                 }
              },
              'callback_uri': `https://pigpile-next.firebaseapp.com/checkoutCallback?pid=${pid}&uid=${uid}`
          },
          function(response) {
              console.log('WEPAY Checkout <CREATED>', response);
              res.send({checkout_uri: response  && response.hosted_checkout && response.hosted_checkout.checkout_uri});
              db.setCheckout({api: admin, pid: pid, uid: uid, update: {
                status: 'amountConfirmed',
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                amount,
                pid,
                uid,
                // Need to cancel callbacks for old wepay checkouts if new one created
                // checkout_id: response.checkout_id,
                // checkout_uri: response  && response.hosted_checkout && response.hosted_checkout.checkout_uri
              }})
              // {checkout_uri: response  && response.hosted_checkout && response.hosted_checkout.checkout_uri}

          }
      );

    })


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
/*
exports.createCheckout = functions.firestore.document('piles/{pileId}/checkouts/{userId}').onWrite(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    var newValue = event.data.data();
    console.log('EVENT createCheckout', event.params)
    // access a particular field as you would any JS property
    var amount = newValue.amount || 0;
    var pid = event.params.pileId;
    var uid = event.params.userId;
    var previousValue = event.data.previous.data();

    const prom = new Promise(function (resolve) {

      if (!pid || !uid || amount < 5 || amount === previousValue.amount) return resolve()

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
                'mode': 'iframe',
              },
              // 'unique_id': previousValue.uid,
              'callback_uri': `https://pigpile-next.firebaseapp.com/checkoutCallback?pid=${pid}&uid=${uid}`
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
*/

exports.app = functions.https.onRequest(app);
exports.checkout = functions.https.onRequest(checkout);
exports.checkoutCallback = functions.https.onRequest(checkoutCallback);
