import { takeEvery, call, put } from 'redux-saga/effects'
import {gets, getting as getIt, gettingSuccess, gettingError} from './index'

// Doing in saga to extract any reference to ajax or db layer from components.
function* workGet(api, {type, payload: {getting, onSuccess, onError, ...rest}}) { // , ...rest

  console.log('workGet', getting, api)
  console.log('action type', type)

  // console.log('workSubscription', api, instance, subscription, onSuccess, onError, rest)
  if (!api || !getting) return;

  const id = rest.id || Date.now()

  yield put(getIt(id))

  const results = yield call(getting, {
    api,
    ...rest, // Most likely an 'id' property in rest
  });

  yield call(onSuccess, results)

  yield put(gettingSuccess(id))

  // handle error
}

//=====================================
//  WATCHERS
//-------------------------------------

export default [
  watchGet,
]

function* watchGet(...args) {
  console.log('init watchGet', gets)
  yield takeEvery(gets, workGet, ...args)
}

