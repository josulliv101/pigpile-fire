// import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import {error, initCheckout, setIframe} from './index'
import {getTheme} from '../../../../functions/db-firestore'


function* workCheckoutInit(api) {

  console.log('workCheckoutInit', api)

  if (!api) return;
/*
  try {
  	const theme = yield call(getTheme, {api, id})

  	console.log('workThemePreview theme', theme)

  	yield put(setThemePreview(theme))

  } catch (e) {
    console.log('error', e)
    yield put(error(id, error))
  }
  */
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

