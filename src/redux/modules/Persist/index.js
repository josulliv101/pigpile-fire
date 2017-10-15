import { createAction, handleActions } from 'redux-actions'

export const persistUpdate = createAction('@pigpile/PERSIST_UPDATE', (id, update) => ({id, update}))
export const persistUpdateSuccess = createAction('@pigpile/PERSIST_UPDATE_SUCCESS', (id, showSuccessIndicator) => ({id, showSuccessIndicator}))
export const persistUpdateError = createAction('@pigpile/PERSIST_UPDATE_ERROR', (id, error) => ({id, error}))

const initialState = {
	/*
	foobar: {
		inprocess: false,
		done: true,
		error: null,
	}
	*/
}

// Settings is a catch-all area for data that doesn't warrant its own redux module

export const reducer = handleActions({

  [persistUpdate]: (state, {payload: {id}}) => ({
    ...state,
    [id]: {
    	inprocess: true,
    	done: false,
      error: null,
    },
  }),

  [persistUpdateSuccess]: (state, {payload: {id, showSuccessIndicator = false}}) => ({
    ...state,
    [id]: {
      inprocess: false,
      done: true,
      error: null,
      successUi: showSuccessIndicator,
    },
  }),

  [persistUpdateError]: (state, {payload: {id, error}}) => ({
    ...state,
    [id]: {
      inprocess: false,
      done: true,
      error,
    },
  }),

}, initialState)
