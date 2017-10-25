import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import createSagaMiddleware, {END} from 'redux-saga'
import {reducer as formReducer} from 'redux-form'
// import {reducer as asyncWorkReducer} from '@josulliv101/connect-async-work'
//
// import {reducer as authReducer} from './modules/Auth'
// import {reducer as alertReducer} from './modules/Alert'
import {reducer as pilesReducer} from './modules/Pile'
import {reducer as settingsReducer} from './modules/Settings'
import {reducer as persistReducer} from './modules/Persist'
import {reducer as getReducer} from './modules/Get'

export default function configureStore(initialState, ...enhancerAddOns) {

  const devtools = typeof window === 'object' && window.devToolsExtension ?
    window.devToolsExtension : (() => noop => noop)

  const sagaMiddleware = createSagaMiddleware()

  const reducer = combineReducers({
    form: formReducer,
    persist: persistReducer,
    pile: pilesReducer,
    gettings: getReducer,
    settings: settingsReducer,
  })

  const middlewares = [
    sagaMiddleware,
  ]

  const enhancers = [
    applyMiddleware(...middlewares),
    devtools(),
    ...enhancerAddOns
  ]

  const store = createStore(reducer, initialState, compose(...enhancers))

  store.runSaga = sagaMiddleware.run

  store.close = () => {
    store.dispatch(END)
  }

  return store
}
