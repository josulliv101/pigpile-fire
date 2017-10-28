import React from 'react';
import {hydrate} from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles'
//
import {authenticate, authRefreshToken} from '../../redux/modules/Auth'
import configureStore from '../../redux/createStore'
import rootSaga from '../../redux/rootSaga'
import {theme} from '../../style';
import App from '../App';

// Firebase is a global on client in order to streamline build process.
const api = firebase;
const store = configureStore(window.__initialState);
const dispatch = store.dispatch

// firebase required as global
if (!api) throw(new Error('An api is required.'))


const firebaseAuth = api.auth()

// The Firebase auth status is the official status even though server verifies jwt and
// the initial hydration reflects the auth status from server.
firebaseAuth.onAuthStateChanged(
	authUser => dispatch(authenticate(authUser, null)),
	error => dispatch(authenticate(null, error))
)

firebaseAuth.onIdTokenChanged(function(authUser) {
		console.log('onIdTokenChanged', authUser)
		if (authUser) {
		  // User is signed in or token was refreshed.
		  dispatch(authRefreshToken(authUser))
		}
	}, 
	error => console.log('err onIdTokenChanged', error)
)

const render = (Component) => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <MuiThemeProvider theme={theme()}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
};

store.runSaga(rootSaga, api);
render(App);

if (module.hot) {
  // We need to re-require the main App module.
  module.hot.accept('../App', () => {
    render(require('../App').default)
  })
}
