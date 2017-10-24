import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from 'material-ui/Button'
import {Route, Switch} from 'react-router-dom'
import {withStyles} from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
//
import PileUpdate from './PileUpdate'

const styles = (theme) => ({
  root: {
    background: theme.palette.grey[200],
    // display: 'none',
    // color: theme.palette.common.white,
    // position: 'relative',
    height: '100%',

    // boxShadow: theme.shadows[4],
    overflow: 'visible',
    position: 'fixed',
    // transform: 'translate3d(-384px, 0px, 0px)',
    width: theme.components.drawer.width,
    '&$mounted': {
    	// display: 'block',
    },
  },
  // So that the main content gets pushed over
  docked: {
  	transition: theme.transitions.create(['width']),
  	width: 0,
  },
  dockedOpen: {
  	width: theme.components.drawer.width,
  },
  foo: {
    width: theme.components.drawer.width,
  },
  mounted: {},
  drawerPaper: {
  	/*
    alignItems: 'flex-start',
    // background: theme.palette.common.lightBlack,
    display: 'flex',
    // height: '100%',
    overflow: 'visible',
    */
    width: theme.components.drawer.width,
    // position: 'relative',
    height: '100%',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class AppDrawer extends Component {

  state = {
  	mounted: false,
  }

  componentDidMount = () => {
  	this.setState({mounted: true})
  }

  render() {
    const {className, classes: cls, dispatch, direction, drawer, handleStickyNavChange, history, location, navDocked, staticContext, stickyEnabled, ...props} = this.props
    
    if (!this.state.mounted) return null

    return (
	    <Drawer
	      type="persistent"
	      open={props.open}
	      classes={{
	      	docked: classNames(cls.docked, {[cls.dockedOpen]: props.open}),
	        paper: cls.drawerPaper,
	      }}>
	      <PileUpdate {...props} />
	    </Drawer>
    )
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(AppDrawer)

