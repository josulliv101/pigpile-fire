import { createAction, handleActions } from 'redux-actions'

export const getting = createAction('@pigpile/GETTING', (id) => ({id}))
export const gettingSuccess = createAction('@pigpile/GETTING_SUCCESS', (id) => ({id}))
export const gettingError = createAction('@pigpile/GETTING_ERROR', (id, error) => ({id, error}))

// Helpful to have individual actions while in development
export const getPile = createAction('@pigpile/GET_PILE')
export const getTrending = createAction('@pigpile/GET_TRENDING')
export const getAllTags = createAction('@pigpile/GET_ALL_TAGS')
export const getAllThemes = createAction('@pigpile/GET_ALL_THEMES')

// Helpful to have exports grouped as arrays in saga
export const gets = [
  getAllTags,
  getAllThemes,
  getPile,
  getTrending,
];

// Pass in global state
export const anyInProcess = ({gettings = {}}) => Object.keys(gettings).some(key => gettings[key] && gettings[key].inprocess !== true)
export const anyError = ({gettings = {}}) => Object.keys(gettings).some(key => gettings[key] && gettings[key].error)
export const allDone = ({gettings = {}}) => Object.keys(gettings).every(key => gettings[key] && gettings[key].done === true)

const initialState = {}

// Settings is a catch-all area for data that doesn't warrant its own redux module

export const reducer = handleActions({

  [getting]: (state, {payload: {id}}) => ({
    ...state,
    [id]: {
    	inprocess: true,
    	done: false,
      error: null,
    },
  }),

  [gettingSuccess]: (state, {payload: {id}}) => ({
    ...state,
    [id]: {
      inprocess: false,
      done: true,
      error: null,
    },
  }),

  [gettingError]: (state, {payload: {id, error}}) => ({
    ...state,
    [id]: {
      inprocess: false,
      done: true,
      error,
    },
  }),

}, initialState)