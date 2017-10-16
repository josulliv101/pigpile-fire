import {all} from 'redux-saga/effects'
// import {watchAsyncWork} from '@josulliv101/connect-async-work'
//
import pileWatchers from './modules/Pile/sagas'
import subscriptionWatchers from './modules/Subscription/sagas'
import getWatchers from './modules/Get/sagas'
import persistWatchers from './modules/Persist/sagas'

export default function* rootSaga(api) {
  console.log('rootSaga received api', api)
  yield all([
    ...pileWatchers.map(fn => fn(api)),
    ...subscriptionWatchers.map(fn => fn(api)),
    ...getWatchers.map(fn => fn(api)),
    ...persistWatchers.map(fn => fn(api)),
  ])
}
