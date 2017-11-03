// import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import {error, preview, setThemePreview} from './index'
import {getTheme} from '../../../../functions/db-firestore'

// Doing in saga to extract any reference to ajax or db layer from components.
function* workThemePreview(api, {payload: {id}}) {

  console.log('workThemePreview', api, id)

  if (!api || !id) return;

  try {
  	const theme = yield call(getTheme, {api, id})
  	
  	console.log('workThemePreview theme', theme)

  	yield put(setThemePreview(theme))

  } catch (e) {
    console.log('error', e)
    yield put(error(id, error))
  }
/*  */
}

//=====================================
//  WATCHERS
//-------------------------------------

export default [
  watchThemePreview,
]

function* watchThemePreview(...args) {
  console.log('init watchThemePreview')
  yield takeEvery(preview, workThemePreview, ...args)
}

