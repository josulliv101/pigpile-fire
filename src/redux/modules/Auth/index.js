import { createAction, handleActions } from 'redux-actions'

export const authSignIn = createAction('@pigpile/AUTH_SIGNIN', (providerId) => ({providerId}))
export const authHandleRedirect = createAction('@pigpile/AUTH_HANDLE_REDIRECT')
export const authRefreshToken = createAction('@pigpile/AUTH_REFRESH_TOKEN', (authUser) => ({authUser}))
export const authSignInSuccess = createAction('@pigpile/AUTH_SIGNIN_SUCCEESS', (user) => ({user}))
export const authSignInFailure = createAction('@pigpile/AUTH_SIGNIN_FAILURE')
export const authSignOut = createAction('@pigpile/AUTH_SIGNOUT')
export const authSignOutSuccess = createAction('@pigpile/AUTH_SIGNOUT_SUCCEESS')
export const authSignOutFailure = createAction('@pigpile/AUTH_SIGNOUT_FAILURE')
export const authenticate = createAction('@pigpile/AUTH_AUTHENTICATE', (user, error) => ({user, error}))

export const providerIds = {
  FACEBOOK: 'facebook',
  GITHUB: 'github',
  GOOGLE: 'google',
}

const initialState = {
  authenticated: false,
  uid: null,
  user: null,
}

export const reducer = handleActions({

  [authSignInSuccess]: (state, {payload: {user}}) => ({
    authenticated: true,
    isAnonymous: user.isAnonymous,
    uid: user.uid,
    user,
  }),

  [authSignOutSuccess]: () => initialState,

}, initialState)
