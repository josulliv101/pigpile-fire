// import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import {error, initCheckout, setIframe} from './index'
import {setCheckout} from '../../../../functions/db-firestore'


function* workCheckoutInit(api, {payload: {amount}}) {

  console.log('workCheckoutInit', api, amount)

  if (!api || !amount) return;

  try {

    const firebaseAuth = api.auth()

    let authData;

    // User should at the very least be anonymously logged in
    if (!firebaseAuth.currentUser) return

    console.log('workCheckoutInit currentUser', authData)

  	const data = yield call(setCheckout, {
      api,
      id: firebaseAuth.currentUser.uid,
      update: {
        amount,
        createdAt: api.firestore.FieldValue.serverTimestamp(),
        uid: firebaseAuth.currentUser.uid,
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
]

function* watchCheckoutInit(...args) {
  console.log('init watchCheckoutInit')
  yield takeEvery(initCheckout, workCheckoutInit, ...args)
}

