import { takeEvery, call, put } from 'redux-saga/effects'
import {gets} from './index'

// Doing in saga to extract any reference to ajax or db layer from components.
function* workGet(api, {payload: {getting, onSuccess, onError, ...rest}}) { // , ...rest

	console.log('workGet', getting, api)

  // console.log('workSubscription', api, instance, subscription, onSuccess, onError, rest)
  if (!api || !getting) return;

  console.log('workGet', getting, api)

  const results = yield call(getting, {
    api,
    ...rest, // Most likely an 'id' property
  });

  yield call(onSuccess, results)
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

