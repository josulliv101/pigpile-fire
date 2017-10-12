import { createAction, handleActions } from 'redux-actions'

export const setting = createAction('@pigpile/SETTINGS_SET', (id, val) => ({id, val}))

const initialState = {
  drawer: false,
  scrolled: false,
}

// Settings is a catch-all area for data that doesn't warrant its own redux module

export const reducer = handleActions({

  [setting]: (state, {payload: {id, val}}) => ({
    ...state,
    [id]: val,
  }),

}, initialState)
