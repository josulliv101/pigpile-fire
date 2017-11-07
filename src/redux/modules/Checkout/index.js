import { createAction, handleActions } from 'redux-actions'

export const initCheckout = createAction('@pigpile/CHECKOUT_INIT', (amount) => ({amount}))
export const setIframe = createAction('@pigpile/CHECKOUT_SET_IFRAME', (iframe) => ({iframe}))
export const error = createAction('@pigpile/CHECKOUT_ERROR', (error) => ({error}))

const initialState = {
  iframe: null,
  error: null,
}

export const reducer = handleActions({

  [setIframe]: (state, {payload = {}}) => ({
    ...state,
    iframe: payload.iframe,
  }),

  [error]: (state, {payload = {}}) => ({
    ...state,
    error: payload.error,
  }),

}, initialState)
