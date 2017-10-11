import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
//
import Brand from './Brand'
import Logo from './Logo'
import LoginButton from './LoginButton'

const styles = (theme, {primary, common: {white}} = theme.palette) => ({
  root: {
    alignItems: 'center',
    backgroundColor: primary[500],
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    position: 'fixed',
    width: '100%',
    zIndex: 2,
    '&$withDrawer': {
      '& $logo': {
        left: `calc(50% + ${theme.components.drawer.width/2}px)`,
      },
    },
  },
  logo: {
    left: '50%',
    position: 'fixed',
    // top: 0,
  },
  withDrawer: {}
});

class AppBar extends Component {

  render() {
    const {children, classes: cls, drawer} = this.props;
  	return (
      <header className={classNames(cls.root, {[cls.withDrawer]: drawer})}>
        <Brand />
        <Logo className={cls.logo} />
        <LoginButton />
      </header>
  	)
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppBar)
