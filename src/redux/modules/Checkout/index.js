import { createAction, handleActions } from 'redux-actions'

export const initCheckout = createAction('@pigpile/CHECKOUT_INIT', (pid, amount) => ({pid, amount}))
export const confirmedCheckout = createAction('@pigpile/CHECKOUT_CONFIRMED', (pid, amount) => ({pid, amount}))
export const completeCheckout = createAction('@pigpile/CHECKOUT_COMPLETE', (pid, checkout_id) => ({pid, checkout_id}))
export const setIframe = createAction('@pigpile/CHECKOUT_SET_IFRAME', (iframe) => ({iframe}))
export const iframeLoaded = createAction('@pigpile/CHECKOUT_IFRAME_LOADED', (loaded = false) => ({loaded}))
export const error = createAction('@pigpile/CHECKOUT_ERROR', (error) => ({error}))

const initialState = {
  iframe: null,
  error: null,
  loaded: false,
}

export const reducer = handleActions({

  [setIframe]: (state, {payload = {}}) => ({
    ...state,
    iframe: payload.iframe
  }),

  [iframeLoaded]: (state, {payload = {}}) => ({
    ...state,
    loaded: payload.loaded
  }),

  [error]: (state, {payload = {}}) => ({
    ...state,
    error: payload.error,
  }),

}, initialState)
