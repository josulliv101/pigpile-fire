import { createAction, handleActions } from 'redux-actions'

export const trending = createAction('@pigpile/PILES_TRENDING')
export const addTrending = createAction('@pigpile/PILES_TRENDING_ADD')

const initialState = {
  trending: [],
}

export const reducer = handleActions({

  [trending]: (state, {payload}) => ({
    ...state,
    trending: payload,
  }),

  [addTrending]: (state, {payload}) => ({
    ...state,
    trending: state.trending.concat([payload]),
  }),

}, initialState)
