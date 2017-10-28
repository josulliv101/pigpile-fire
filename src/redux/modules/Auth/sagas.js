import { takeLatest, call, put } from 'redux-saga/effects'
// import { firebaseAuth } from 'redux/modules/Firebase'
import {
	authenticate, 
	authHandleRedirect, 
	authRefreshToken, 
	authSignInSuccess, 
	authSignInFailure, 
	authSignIn, 
	authSignOut, 
	authSignOutSuccess, 
	authSignOutFailure
} from './'
import {setting} from '../Settings'

function* workSignIn(api, {payload: {providerId}}) {

  console.log('workSignIn', providerId)

  const providerGithub = new firebase.auth.GithubAuthProvider()
  providerGithub.addScope('user:email')

  //const {firebaseAuth, getGithubProvider} = yield call(() => import(/* webpackChunkName: "Firebase" */ '../Firebase'))
  const firebaseAuth = api.auth()
  console.log('firebaseAuth currentUser', firebaseAuth.currentUser)

  const authProvider = providerGithub

  try {
    console.log('authProvider', authProvider)
    const authData = yield call([firebaseAuth, firebaseAuth.signInWithRedirect], authProvider)
    console.log('got back authData...', authData)

    // ...Auth does its thing and redirects to login page with user available

  }
  catch (error) {
    console.log('error', error)
    yield put(authSignInFailure(error))
  }

}


function* workAuthRedirect(api) {

  // const {firebaseAuth} = yield call(() => import(/* webpackChunkName: "Firebase" */ '../Firebase'))
  const firebaseAuth = api.auth()

  try {

  	yield put(setting('handlingAuthRedirect', true))

    const {user} = yield call([firebaseAuth, firebaseAuth.getRedirectResult])

    console.log('handleAuthRedirect user', user)

    // If redirect returned no user, we're done
    if (!user) return

    
    const {displayName, photoURL, uid} = user.toJSON()
    // const userExists = yield call(insert, uid, email, {displayName, photoURL, uid})

    // if (userExists) console.log('user already Exists', true)


    yield put(authSignInSuccess({displayName, photoURL, uid}))

    yield put(setting('handlingAuthRedirect', false))

    // getIdToken returns a promise
    const jwt = yield call(() => user.getIdToken(true)) // TODO need true here for forced refresh?
    console.log('authData.user', jwt)
    // yield call([api, api.post], '/cookie', {jwt})


  }
  catch (error) {
    console.log('error', error)
    yield put(authSignInFailure(error))
  }
/*
  function insert(uid, email, data) {

    const createdAt = {'.sv': 'timestamp'}
    const ref = firebaseDb.ref('/')

    if (!uid) return

    return new Promise(resolve => {

      ref.child('users').child(uid).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null)

        if (exists) return resolve(true)

        var updatedUserData = {}
        updatedUserData['private/users/' + uid] = {createdAt, email}
        updatedUserData['users/' + uid] = Object.assign({createdAt}, data)

        return ref.update(updatedUserData, function(error) {
          if (error) {
            console.log('Error updating data:', error)
          }
          resolve(false)
        })
      })
    })

    // return firebaseDb.ref(`/users/${item.uid}`).set(Object.assign({createdAt}, item))
  }
*/
}

function* workSignOut(api) {

  console.log('signOut', api)

  // const {firebaseAuth} = yield call(() => import(/* webpackChunkName: "Firebase" */ '../Firebase'))
  const firebaseAuth = api.auth()

  try {
    yield call([firebaseAuth, firebaseAuth.signOut])
    yield put(authSignOutSuccess())
    // yield call([api, api.post], '/cookie')
  }
  catch (error) {
    yield put(authSignOutFailure(error))
  }
}

function* workAuthenticate(api, {payload: {user, error}}) {

  console.log('workAuthenticate', api, user, error)

  // Should be already loaded at this point
  // const {firebaseAuth} = yield call(() => import(/* webpackChunkName: "Firebase" */ '../Firebase'))
  const firebaseAuth = api.auth()

  console.log('firebaseAuth currentUser', firebaseAuth.currentUser)

  // If there's a user and no error... successfully authenticated.
  if (user && !error) {
    console.log('normalized user', getNormalizedUser(user))
    yield put(authSignInSuccess(getNormalizedUser(user)))
  } else if (firebaseAuth.currentUser && !user && !error) {
    yield put(authSignOut())
  } else if (error) {
    yield put(authSignInFailure(error))
  }
}

function* workRefreshToken(api, {payload: {authUser}}) {

  console.log('workRefreshToken', api, authUser)

  if (!authUser) return

  // getIdToken returns a promise
  const jwt = yield call(() => authUser.getIdToken())
  console.log('authData.user', jwt)
  // yield call([api, api.post], '/cookie', {jwt})

  // TODO Add error handling
}

function getNormalizedUser(authUser) {
  if (!authUser) return
  const {displayName, email, photoURL, uid} = authUser.toJSON()
  return {displayName, email, photoURL, uid}
}

//=====================================
//  WATCHERS
//-------------------------------------

export default [
  watchAuthenticate,
  watchAuthRedirect,
  watchRefreshToken,
  watchSignIn,
  watchSignOut,
]

function* watchAuthenticate(...args) {
  console.log('watchAuthenticate')
  yield takeLatest(authenticate, workAuthenticate, ...args)
}

function* watchRefreshToken(...args) {
  console.log('watchRefreshToken')
  yield takeLatest(authRefreshToken, workRefreshToken, ...args)
}

function* watchSignIn(...args) {
  console.log('watchSignIn')
  yield takeLatest(authSignIn, workSignIn, ...args)
}

function* watchAuthRedirect(...args) {
  console.log('watchAuthRedirect')
  yield takeLatest(authHandleRedirect, workAuthRedirect, ...args)
}

function* watchSignOut(...args) {
  console.log('watchSignOut')
  yield takeLatest(authSignOut, workSignOut, ...args)
}

