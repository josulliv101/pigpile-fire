import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
//
import Brand from './Brand'
import Tagline from './Tagline'
import Logo from './Logo'
import LoginButton from './LoginButton'
import AccountButton from './AccountButton'

const styles = (theme, {primary, common: {white}} = theme.palette, {up, values} = theme.breakpoints) => ({
  root: {
    // alignItems: 'flex-start', // Needs to be flex-start or gets cut off do to height 0
    color: white,
    // display: 'flex',
    height: 0, // NavBar links below AppBar need to still be clickable. 0 height resolves that.
    // justifyContent: 'space-between',
    // overflow: 'visible',
    // paddingLeft: theme.spacing.unit,
    // paddingRight: theme.spacing.unit,
    // position: 'fixed',
    width: '100%',
    zIndex: 4,
    '&$withDrawer': {
      '& $brand': {
        left: theme.spacing.unit * 2 + theme.components.drawer.width,
      },
      '& $logo': {
        left: `calc(50% + ${theme.components.drawer.width/2}px)`,
      },
      '& $tagline': {
        left: 140 + theme.components.drawer.width,
      },
    },
    '& $brand, $logo, $login, $tagline': {
      position: 'fixed',
      transform: 'scale3d(1, 1, 1) translateY(0px)',
      // transition: theme.transitions.create(['transform']),
    },
    '& $brand, $login, $tagline': {
      // position: 'absolute',
      zIndex: 2,
    },
  },
  brand: {
    left: theme.spacing.unit * 2,
  },
  docked: {
    // display: 'none',
  },
  login: {
    right: theme.spacing.unit * 2,
  },
  logo: {
    left: '50%',
    transition: theme.transitions.create(['left', 'transform']),
    zIndex: 4,
  },
  tagline: {
    left: 140,
    top: theme.spacing.unit/2,
  },
  transformOriginLeft: {
    transformOrigin: 'left center',
  },
  withDrawer: {},

  [up(values.md)]: {
    drawer: {},
    root: {
      '& $shrink': {
        transform: 'scale3d(.8, .8, 1) translate3d(0, -6px, 0)',
      },
      '& $shrinkLogin': {
        transform: 'scale3d(.8, .8, 1) translate3d(0, -12px, 0)',
      },
      '& $shrinkLogo': {
        transform: 'scale3d(.8, .8, 1) translate3d(0, -18px, 0)',
      },
      '& $shrinkTagline': {
        transform: 'scale3d(.86, .86, 1) translate3d(-24px, -6px, 0)',
      },
      '& $brand, $login': {
        // zIndex: 4,
      },
    },
    brand: {},
    login: {},
    shrink: {},
    shrinkLogin: {},
    shrinkLogo: {},
    shrinkTagline: {},
  },

  [up(1240)]: {
    root: {
      '& $brand, $login, $tagline': {
        transition: theme.transitions.create(['left', 'transform']),
      },
      '& $brand, $login': {
        zIndex: 4,
      },
    },
    brand: {},
    login: {},
    tagline: {},
  },

  // Avoid appbar text and text in content colliding.
  [up(1660)]: {
    root: {
      '& $tagline': {
        zIndex: 4,
      },
    },
    tagline: {},
  },
});

class AppBar extends Component {

  render() {
    const {auth, children, classes: cls, drawer, match = {}, navDocked, ...props} = this.props;
    const clsShrink = {[cls.shrink]: navDocked};
    const {params = {}} = match

    console.log('id!!!', props)
  	return (
      <div className={classNames(cls.root, {[cls.docked]: navDocked}, {[cls.withDrawer]: drawer})}>
        <Brand className={classNames(cls.brand, cls.transformOriginLeft, clsShrink)} />
        <Tagline className={classNames(cls.tagline, cls.transformOriginLeft, {[cls.shrinkTagline]: navDocked})} />
        <Logo {...props} className={classNames(cls.logo, {[cls.shrinkLogo]: navDocked})} />
				{auth && auth.authenticated
					? <AccountButton className={classNames(cls.login, {[cls.shrinkLogin]: navDocked})} user={auth.user}  />
					: <LoginButton className={classNames(cls.login, {[cls.shrinkLogin]: navDocked})} />}
      </div>
  	)
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  drawer: PropTypes.bool,
  navDocked: PropTypes.bool.isRequired,
};

AppBar.defaultProps = {
  navDocked: false,
};

export default compose(
	withStyles(styles),
	connect((state, {id}) => ({
		id,
	})),
)(AppBar)
