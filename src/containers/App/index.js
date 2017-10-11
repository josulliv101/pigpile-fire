import React, {Component} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {Link, Route, Switch} from 'react-router-dom'
import {withStyles} from 'material-ui/styles'
//
import globalStyle from '../../style/global'
import AppFrame from './AppFrame'
import AppContent from './AppContent'
import Home from '../pages/Home'
import Pile from '../pages/Pile'
import withoutServerStyle from '../../hocs/withoutServerStyle'

const styles = (theme) => ({
  '@global': globalStyle(theme),
  root: {
    display: 'flex',
  },
});

class App extends Component {

  render() {
    const {classes: cls} = this.props;
    console.log('App props', this.props)
  	return (
    	<AppFrame drawer={false}>
        <AppContent />
      </AppFrame>
  	)
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default compose(
  withStyles(styles),
  withoutServerStyle(),
)(App)


