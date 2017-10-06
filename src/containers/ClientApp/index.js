import React from 'react';
import {hydrate} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider } from 'material-ui/styles'
//
import {theme} from '../../style';
import App from '../App';

const render = (Component) => {
  hydrate(
    <AppContainer>
      <MuiThemeProvider theme={theme()} >
        <BrowserRouter>
          <Component state={window.__initialState} />
        </BrowserRouter>
        </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('root')
  )
};

render(App);

if (module.hot) {
  // We need to re-require the main App module.
  module.hot.accept('../App', () => {
    render(require('../App').default)
  })
}
