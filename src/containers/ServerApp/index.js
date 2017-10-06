import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
//
import configureStore from '../../redux/createStore'
// import rootSaga from '../redux/rootSaga'
import {configureJss, theme} from '../../style';
import App from '../App';

// const store = configureStore(initialState)


export default class ServerApp extends React.Component {
  render() {
    const {context, initialState, JssProvider, sheetsRegistry, url} = this.props;
    const jss = configureJss()
    return (
      <Provider store={configureStore(initialState)}>
        <StaticRouter location={url} context={context}>
        	<JssProvider registry={sheetsRegistry} jss={jss}>
          	<MuiThemeProvider theme={theme()} sheetsManager={new WeakMap()}>
            	<App />
          	</MuiThemeProvider>
        	</JssProvider>
        </StaticRouter>
      </Provider>
    );
  }
}
