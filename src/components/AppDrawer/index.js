import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
//

const styles = (theme) => ({
  root: {
    background: theme.palette.grey[200],
    // color: theme.palette.common.white,
    position: 'relative',
    height: '100%',
    width: theme.components.drawer.width,
    // boxShadow: theme.shadows[4],
    overflow: 'visible',
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

class AppDrawer extends PureComponent {

  render() {
    const {className, classes: cls} = this.props
    return (
      <Drawer
        {...this.props}
        type="persistent"
        classes={{
          paper: cls.root,
        }}
      >
        <div className={cls.drawerPaper}>
          <Button>layout default</Button>
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

