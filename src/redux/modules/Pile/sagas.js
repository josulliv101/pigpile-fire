import { takeLatest, call, put } from 'redux-saga/effects'
import {unwatchTrendingPiles, update, watchTrendingPiles} from './index'

let unsubscribeWatchTrending = null;

function* workWatchTrending(firebase) {

  console.log('workWatchTrending', firebase)

  // Just in case
  // if (unsubscribeWatchTrending) unsubscribeWatchTrending()

  const unsubscribeWatchTrending = yield call(
    [firebase, firebase.firestore().collection("piles").onSnapshot],
      function(snapshot) {
          console.log("saga:snapshot: ", snapshot.size);
          const data = snapshot.docs.map(doc => doc.data());
          // yield put(update('trending', data))
      },
      function(e) {
        console.log('saga:err', e)
      }
  )
  // cosnole.log('unsubscribeWatchTrending', unsubscribeWatchTrending)
/*  unsubscribeWatchTrending = firebase.firestore()
    .collection("piles")
    .onSnapshot(function(snapshot) {
        console.log("saga:snapshot: ", snapshot.size);
        const data = snapshot.docs.map(doc => doc.data());
        yield put(update('trending', data))
    }, function(e) {
      console.log('saga:err', e)
    })*/
}

function* workUnwatchTrending(firebase) {

  if (unsubscribeWatchTrending) unsubscribeWatchTrending()
  unsubscribeWatchTrending = null;
  console.log('workUnwatchTrending', firebase)

}

//=====================================
//  WATCHERS
//-------------------------------------

export default [
  unwatchTrending,
  watchTrending,
]

function* watchTrending(...args) {
  console.log('init watchTrending')
  yield takeLatest(watchTrendingPiles, workWatchTrending, ...args)
}

function* unwatchTrending(...args) {
  console.log('init unwatchTrending')
  yield takeLatest(unwatchTrendingPiles, workUnwatchTrending, ...args)
}
