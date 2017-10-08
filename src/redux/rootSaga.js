import {all} from 'redux-saga/effects'
// import {watchAsyncWork} from '@josulliv101/connect-async-work'
//
import pileWatchers from './modules/Pile/sagas'

export default function* rootSaga(firebase) {
  yield all([
    ...pileWatchers.map(fn => fn(firebase)),
    // watchAsyncWork(),
  ])
}
