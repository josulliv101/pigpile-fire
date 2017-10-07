import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { MuiThemeProvider } from 'material-ui/styles';
//
import configureStore from '../../redux/createStore'
// import rootSaga from '../redux/rootSaga'
import {configureJss, theme} from '../../style';
import App from '../App';

// const store = configureStore(initialState)


export class ServerApp extends React.Component {
  render() {
    const {context, initialState, sheets, url} = this.props;
    const jss = configureJss()

    console.log('sheets', sheets)
    return (
      <Provider store={configureStore(initialState)}>
        <StaticRouter location={url} context={context}>
        	<JssProvider registry={sheets} jss={jss}>
          	<MuiThemeProvider theme={theme()} sheetsManager={new Map()}>
            	<App />
          	</MuiThemeProvider>
        	</JssProvider>
        </StaticRouter>
      </Provider>
    );
  }
}

// Avoid warning in cloud function by exposing SheetRegistry from server
// bundle instead of importing dup of react-jss in cloud function
export function getSheetsRegistry() {
  return SheetsRegistry;
}
