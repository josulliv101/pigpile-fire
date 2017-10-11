import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link, Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
//
import globalStyle from '../../style/global'
import AppBar from '../../components/AppBar'
import AppFooter from '../../components/AppFooter'
import BgImage from '../../components/BgImage'
import Hero from '../../components/Hero'
import NavBar from '../../components/NavBar'

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
    const {children, classes: cls, ...props} = this.props;
  	return (
    	<div className={classNames(cls.root, {[cls.withDrawer]: props.drawer})}>
        {
          props.drawer &&
          <nav>
            <div>drawer</div>
          </nav>
        }
        <div>
          <BgImage {...props} />
          <AppBar {...props} />
          <Hero />
          <NavBar />
          {children}
          <AppFooter />
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
