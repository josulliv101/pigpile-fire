import {all} from 'redux-saga/effects'
// import {watchAsyncWork} from '@josulliv101/connect-async-work'
//
// import authWatchers from './modules/Auth/sagas'

export default function* rootSaga(api) {
  yield all([
    // ...authWatchers.map(fn => fn(api)),
    // watchAsyncWork(),
  ])
}
