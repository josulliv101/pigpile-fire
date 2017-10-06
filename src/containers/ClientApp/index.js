import React from 'react';
import {hydrate} from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../App';


const render = (Component) => {
  hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component state={window.__initialState}/>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root')
  )
};

console.log('render', App);
render(App);

if (module.hot) {
  // We need to re-require the main App module.
  module.hot.accept('../App', () => {
    render(require('../App').default)
  })
}
