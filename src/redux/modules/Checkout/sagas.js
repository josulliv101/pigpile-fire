// import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import {error, confirmedCheckout, initCheckout, setIframe} from './index'
import {setCheckout} from '../../../../functions/db-firestore'


function* workCheckoutConfirm(api, {type, payload: {amount, pid}}) {

  console.log('workCheckoutConfirm', api, type, pid, amount)

  if (!api || !pid || !amount) return;

  try {

    const firebaseAuth = api.auth()

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser) return

    const uid = firebaseAuth.currentUser.uid
  /*
    const data = yield call(setCheckout, {
      api,
      uid,
      pid,
      update: {
        amount,
        createdAt: api.firestore.FieldValue.serverTimestamp(),
        pid,
        uid: firebaseAuth.currentUser.uid,
        type: 'amountConfirmed', // new, amount, complete
      },
    })
  */
    const url = `/checkout?pid=${pid}&uid=${uid}&amount=${amount}`

    console.log('foobar', setIframe('checkout_uri'))

    const data = yield call(fetch, url)
    // const {checkout_uri} = yield call([data, data.json])
    // const {checkout_uri} = data.then(resp => resp.json())
    // if (checkout_uri) yield put(setIframe(checkout_uri))
    // console.log('IFRAME data', checkout_uri)

  } catch (e) {
    console.log('error', e)
    yield put(error(e))
  }


}

function* workCheckoutInit(api, {type, payload: {amount, pid}}) {

  console.log('workCheckoutInit', api, type, pid, amount)

  if (!api || !pid) return;

  try {

    const firebaseAuth = api.auth()

    let authData;

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser) return

    console.log('workCheckoutInit currentUser', authData)

  	const data = yield call(setCheckout, {
      api,
      uid: firebaseAuth.currentUser.uid,
      pid,
      update: {
        amount,
        createdAt: api.firestore.FieldValue.serverTimestamp(),
        pid,
        uid: firebaseAuth.currentUser.uid,
        type: type, // new, amount, complete
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
]

function* watchCheckoutInit(...args) {
  console.log('init watchCheckoutInit')
  yield takeEvery(initCheckout, workCheckoutInit, ...args)
}

function* watchCheckoutConfirm(...args) {
  console.log('init watchCheckoutConfirm')
  yield takeEvery(confirmedCheckout, workCheckoutConfirm, ...args)
}

