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

const store = configureStore(window.__initialState);

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

store.runSaga(rootSaga);
render(App);

if (module.hot) {
  // We need to re-require the main App module.
  module.hot.accept('../App', () => {
    render(require('../App').default)
  })
}
