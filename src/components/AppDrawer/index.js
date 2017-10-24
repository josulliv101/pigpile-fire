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
    display: 'none',
    // color: theme.palette.common.white,
    // position: 'relative',
    height: '100%',

    // boxShadow: theme.shadows[4],
    overflow: 'visible',
    position: 'fixed',
    // transform: 'translate3d(-384px, 0px, 0px)',
    width: theme.components.drawer.width,
    '&$mounted': {
    	display: 'block',
    },
  },

  foo: {
    width: theme.components.drawer.width,
  },
  mounted: {},
  drawerPaper: {
    alignItems: 'flex-start',
    // background: theme.palette.common.lightBlack,
    display: 'flex',
    // height: '100%',
    overflow: 'visible',
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
    const {className, classes: cls, dispatch, direction, drawer, handleStickyNavChange, history, location, match, navDocked, staticContext, stickyEnabled, ...props} = this.props
    
    return (
      <Drawer
        {...props}
        type="persistent"
        classes={{
          paper: classNames(cls.root, {[cls.mounted]: this.state.mounted}),
        }}
        className={classNames(cls.foo)}
      >
        <div className={classNames(cls.drawerPaper)}>
          <Switch>
            <Route path="/login" render={() => null} />
            <Route path="/" exact={true} render={() => null} />
            <Route path='/:id' render={(ownProps) => <PileUpdate {...ownProps} />} />
          </Switch>
        </div>
      </Drawer>
    )
  }
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(AppDrawer)

