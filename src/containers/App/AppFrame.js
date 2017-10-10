import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link, Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
//
import globalStyle from '../../style/global'
import AppBar from '../../components/AppBar'
import Home from '../pages/Home'
import Pile from '../pages/Pile'

const styles = (theme) => ({
  '@global': globalStyle(theme),
  root: {
    display: 'flex',
    '&>nav': {
      flex: '0 1 auto',
      maxWidth: 0,
      width: theme.components.drawer.width,
      '&>div': {
        backgroundColor: theme.palette.common.minBlack,
        height: '100vh',
        position: 'fixed',
        width: theme.components.drawer.width,
      },
    },
    '&>div': {
      flex: 1,
    },
    '&$withDrawer': {
      '&>nav': {
        maxWidth: '100%',
      },
      '&>div': {
        width: `calc(100% - ${theme.components.drawer.width}px)`
      },
    },
  },
  withDrawer: {},
});

class AppFrame extends Component {

  render() {
    const {children, classes: cls, drawer = true} = this.props;
  	return (
    	<div className={classNames(cls.root, {[cls.withDrawer]: drawer})}>
        <nav><div>drawer</div></nav>
        <div>
          <AppBar />
          {children}
          <footer>Pigpile Corporation</footer>
        </div>
    	</div>
  	)
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppFrame)
