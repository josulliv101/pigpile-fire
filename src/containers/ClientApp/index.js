import React from 'react';
import {hydrate} from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles'
//
import configureStore from '../../redux/createStore'
import rootSaga from '../../redux/rootSaga'
import {theme} from '../../style';
import App from '../App';

// Firebase is a global on client in order to streamline build process.
const api = firebase;
const store = configureStore(window.__initialState);

// firebase required as global
if (!api) throw(new Error('An api is required.'))

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
    document.getElementById('root')
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
