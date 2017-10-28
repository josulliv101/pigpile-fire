import { delay } from 'redux-saga'
import { takeEvery, call, put } from 'redux-saga/effects'
import {persistUpdate, persistUpdateSuccess, persistUpdateError} from './index'
import {updatePile} from '../../../../functions/db-firestore'

// Doing in saga to extract any reference to ajax or db layer from components.
function* workPersistUpdate(api, {payload: {id, update}}) {

  console.log('workPersistUpdate', api, id, update)
  if (!api || !id || !update) return;

  try {
  	const data = yield call(updatePile, api, id, update)
  	console.log('data', data)
  	yield put(persistUpdateSuccess(id, true))
  	yield delay(1600)
  	yield put(persistUpdateSuccess(id, false))
  } catch (error) {
    console.log('error', error)
    yield put(persistUpdateError(id, error))
  }
}

//=====================================
//  WATCHERS
//-------------------------------------

export default [
  watchPersistUpdate,
]

function* watchPersistUpdate(...args) {
  console.log('init watchPersistUpdate')
  yield takeEvery(persistUpdate, workPersistUpdate, ...args)
}

