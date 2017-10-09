import { createAction, handleActions } from 'redux-actions'

export const trending = createAction('@pigpile/PILE_TRENDING')
export const update = createAction('@pigpile/PILE_UPDATE', (id, val = null) => ({id, val}))
export const watchTrendingPiles = createAction('@pigpile/PILE_WATCH_TRENDING')
export const unwatchTrendingPiles = createAction('@pigpile/PILE_UNWATCH_TRENDING')
export const addTrending = createAction('@pigpile/PILE_TRENDING_ADD')
// export const watchPile = createAction('@pigpile/PILES_WATCH_PILE')

const initialState = {
  trending: [],
  // pile-foo
  // pile-bar
}

export const reducer = handleActions({

  [update]: (state, {payload}) => {
    console.log('update', payload)
    return {
      ...state,
      [payload.id]: payload.val,
    }
  },

  [trending]: (state, {payload}) => ({
    ...state,
    trending: payload,
  }),

  [addTrending]: (state, {payload}) => ({
    ...state,
    trending: state.trending.concat([payload]),
  }),

}, initialState)
