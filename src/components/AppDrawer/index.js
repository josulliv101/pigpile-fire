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
    // color: theme.palette.common.white,
    position: 'relative',
    height: '100%',

    // boxShadow: theme.shadows[4],
    overflow: 'visible',
    position: 'fixed',
    width: theme.components.drawer.width,
  },
  foo: {
    width: theme.components.drawer.width,
  },
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

  render() {
    const {className, classes: cls, ...props} = this.props
    return (
      <Drawer
        {...this.props}
        type="persistent"
        classes={{
          paper: cls.root,
        }}
        className={cls.foo}
      >
        <div className={cls.drawerPaper}>
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

