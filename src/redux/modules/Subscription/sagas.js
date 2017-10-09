import { takeEvery, call, put } from 'redux-saga/effects'
import {subscribes} from './index'

// Doing in saga to extract any reference to ajax or db layer from components.
function* workSubscription(api, {payload: {instance, subscription, onSuccess, onError, ...rest}}) {

  console.log('workSubscription', api, instance, subscription, onSuccess, onError, rest)
  if (!api || !instance || !subscription) return;

  instance.unsubscribe = yield call(subscription, {
    api,
    onSuccess,
    onError,
    ...rest,
  });
}


//=====================================
//  WATCHERS
//-------------------------------------

export default [
  watchSubscription,
]

function* watchSubscription(...args) {
  console.log('init watchSubscription', subscribes)
  yield takeEvery(subscribes, workSubscription, ...args)
}

