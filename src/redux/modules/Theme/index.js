import { createAction, handleActions } from 'redux-actions'

export const change = createAction('@pigpile/THEME_CHANGE', (id) => ({id}))
export const preview = createAction('@pigpile/THEME_PREVIEW', (id) => ({id}))
export const error = createAction('@pigpile/THEME_ERROR', (error) => ({error}))
export const unsetPreview = createAction('@pigpile/THEME_UNSET_PREVIEW')
export const setTheme = createAction('@pigpile/THEME_SET', (theme) => ({theme}))
export const setThemePreview = createAction('@pigpile/THEME_SET_PREVIEW', (theme) => ({theme}))

const initialState = {
  active: null,
  preview: null,
  error: null,
}

export const reducer = handleActions({

  [setTheme]: (state, {payload = {}}) => ({
    ...state,
    active: payload.theme,
  }),

  [setThemePreview]: (state, {payload = {}}) => ({
    ...state,
    preview: payload.theme,
  }),

  [unsetPreview]: (state) => ({
    ...state,
    preview: null,
  }),

  [error]: (state, {payload = {}}) => ({
    ...state,
    error: payload.error,
  }),

}, initialState)
