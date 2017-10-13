import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {Link, Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
//
import globalStyle from '../../style/global'
import AppBar from '../../components/AppBar'
import AppDrawer from '../../components/AppDrawer'
import AppFooter from '../../components/AppFooter'
import BgImage from '../../components/BgImage'
import Hero from '../../components/Hero'
import NavBar from '../../components/NavBar'

const styles = (theme) => ({
  '@global': globalStyle(theme),
  root: {
    display: 'flex',
    marginLeft: -theme.components.drawer.width,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '&$withDrawer': {
      marginLeft: 0,
    },
  },
  drawer: {},
  bd: {
    flex: 1,
  },
  withDrawer: {},
});

class AppFrame extends Component {

  render() {
    const {children, classes: cls, ...props} = this.props;
  	return (
    	<div className={classNames(cls.root, {[cls.withDrawer]: props.drawer})}>
        <AppDrawer open={props.drawer} {...props} />
        <div className={classNames(cls.bd)}>
          <BgImage {...props} />
          <AppBar {...props} />
          <Hero />
          <NavBar {...props} />
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

export default compose(
  withStyles(styles),
  connect(state => ({drawer: state.settings.drawer})),
)(AppFrame)
