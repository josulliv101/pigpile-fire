import { createAction, handleActions } from 'redux-actions'

// Rather than a generic subscription action, each will have its own unique action.
// This is useful in development -- easily see which subscription actions are fired off.

export const getPile = createAction('@pigpile/GET_PILE')
export const getAllTags = createAction('@pigpile/GET_ALL_TAGS')
export const getAllThemes = createAction('@pigpile/GET_ALL_THEMES')

// Helpful to have exports grouped as arrays in saga
export const gets = [
  getAllTags,
  getAllThemes,
  getPile,
];
