import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import { MuiThemeProvider } from 'material-ui/styles';
//
import {configureJss, theme} from '../../style';
import App from '../App';

const jss = configureJss()

export default class ServerApp extends React.Component {
  render() {
    const {context, initialState, JssProvider, sheetsRegistry, url} = this.props;
    return (
      <StaticRouter location={url} context={context}>
      	<JssProvider registry={sheetsRegistry} jss={jss}>
        	<MuiThemeProvider theme={theme()} sheetsManager={new WeakMap()}>
          	<App state={initialState} />
        	</MuiThemeProvider>
      	</JssProvider>
      </StaticRouter>
    );
  }
}
