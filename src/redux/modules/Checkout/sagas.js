// import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import {error, ccCheckout, completeCheckout, confirmedCheckout, initCheckout, userDetailsCheckout, setIframe} from './index'
import {setCheckout} from '../../../../functions/db-firestore'


function* workCheckoutCC(api, {type, payload: {cc_id, pid}}) {

  console.log('workCheckoutCC', cc_id, pid)

  if (!api || !pid || !cc_id) return;

  const firebaseAuth = api.auth()

  // User should at the very least be anonymously logged in
  if (!firebaseAuth.currentUser || !firebaseAuth.currentUser.uid) return

  const uid = firebaseAuth.currentUser.uid

  const data = yield call(setCheckout, {
    api,
    uid: firebaseAuth.currentUser.uid,
    pid,
    update: {
      cc_id,
      pending: true,
      complete: false,
    },
    options: { merge: true },
  })

}


function* workCheckoutUserDetails(api, {type, payload: {pid, details}}) {

  console.log('workCheckoutUserDetails', api, pid, details)

  if (!api || !pid || !details) return;

  try {

    const firebaseAuth = api.auth()

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser) return

    const uid = firebaseAuth.currentUser.uid

    const data1 = yield call(setCheckout, {
      api,
      uid,
      pid,
      update: {
        details,
        // createdAt: api.firestore.FieldValue.serverTimestamp(),
        pid,
        uid: firebaseAuth.currentUser.uid,
        type: 'userDetails', // new, amount, complete
      },
      options: { merge: true },
    })


    const url = `/checkout?pid=${pid}&uid=${uid}`

    // console.log('foobar', setIframe('checkout_uri'))
    console.time("checkout-confirm");
    const data = yield call(fetch, url)
    console.timeEnd("checkout-confirm");

    const {checkout_uri} = yield call([data, data.json])
    // const {checkout_uri} = data.then(resp => resp.json())
    if (checkout_uri) yield put(setIframe(checkout_uri))


  } catch (e) {
    console.log('error', e)
    yield put(error(e))
  }

}

function* workCheckoutConfirm(api, {type, payload: {amount, pid}}) {

  console.log('workCheckoutConfirm', api, type, pid, amount)

  if (!api || !pid || !amount) return;

  try {

    const firebaseAuth = api.auth()

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser) return

    const uid = firebaseAuth.currentUser.uid

    const data = yield call(setCheckout, {
      api,
      uid,
      pid,
      update: {
        amount,
        // createdAt: api.firestore.FieldValue.serverTimestamp(),
        pid,
        uid: firebaseAuth.currentUser.uid,
        type: 'amountConfirmed', // new, amount, complete
      },
    })
/*


    const url = `/checkout?pid=${pid}&uid=${uid}&amount=${amount}`

    // console.log('foobar', setIframe('checkout_uri'))
    console.time("checkout-confirm");
    const data = yield call(fetch, url)
    console.timeEnd("checkout-confirm");

    const {checkout_uri} = yield call([data, data.json])
    // const {checkout_uri} = data.then(resp => resp.json())
    if (checkout_uri) yield put(setIframe(checkout_uri))
    // console.log('IFRAME data', checkout_uri)
*/
  } catch (e) {
    console.log('error', e)
    yield put(error(e))
  }


}


function* workCheckoutComplete(api, {type, payload: {checkout_id, pid}}) {

  console.log('workCheckoutComplete', pid, checkout_id)

  if (!api || !pid || !checkout_id) return;

  try {

    const firebaseAuth = api.auth()

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser || !firebaseAuth.currentUser.uid) return

    const data = yield call(setCheckout, {
      api,
      uid: firebaseAuth.currentUser.uid,
      pid,
      update: {
        doneAt: api.firestore.FieldValue.serverTimestamp(),
        type: 'complete', // new, amount, complete
        done: true,
      },
      options: { merge: true },
    })

    console.log('workCheckoutInit data', data)

    // yield put(setThemePreview(theme))

  } catch (e) {
    console.log('error', e)
    yield put(error(e))
  }


}


function* workCheckoutInit(api, {type, payload: {amount, pid}}) {

  console.log('workCheckoutInit', api, type, pid)

  if (!api || !pid) return;

  try {

    const firebaseAuth = api.auth()

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser) return

  	const data = yield call(setCheckout, {
      api,
      uid: firebaseAuth.currentUser.uid,
      pid,
      update: {
        // amount,
        createdAt: api.firestore.FieldValue.serverTimestamp(),
        pid,
        uid: firebaseAuth.currentUser.uid,
        type: 'init', // new, amount, complete
      },
    })

  	console.log('workCheckoutInit data', data)

  	// yield put(setThemePreview(theme))

  } catch (e) {
    console.log('error', e)
    yield put(error(e))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

export default [
  watchCheckoutInit,
  watchCheckoutConfirm,
  watchCheckoutComplete,
  watchCheckoutCC,
  watchCheckoutUserDetails,
]

function* watchCheckoutInit(...args) {
  console.log('init watchCheckoutInit')
  yield takeEvery(initCheckout, workCheckoutInit, ...args)
}

function* watchCheckoutCC(...args) {
  console.log('init watchCheckoutCC')
  yield takeEvery(ccCheckout, workCheckoutCC, ...args)
}

function* watchCheckoutUserDetails(...args) {
  console.log('init watchCheckoutUserDetails')
  yield takeEvery(userDetailsCheckout, workCheckoutUserDetails, ...args)
}

function* watchCheckoutConfirm(...args) {
  console.log('init watchCheckoutConfirm')
  yield takeEvery(confirmedCheckout, workCheckoutConfirm, ...args)
}

function* watchCheckoutComplete(...args) {
  console.log('init watchCheckoutComplete')
  yield takeEvery(completeCheckout, workCheckoutComplete, ...args)
}
