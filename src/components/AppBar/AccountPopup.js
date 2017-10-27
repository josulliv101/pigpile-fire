import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import Popover from 'material-ui/Popover'
//
import {authSignOut} from '../../redux/modules/Auth'

const styles = (theme) => ({
  root: {
    alignItems: 'center',
    background: theme.palette.background.appBar,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  aside: {
    alignSelf: 'flex-end',
    background: 'rgba(0,0,0,.05)',
  },
  avatar: {
    background: 'rgb(255, 73, 73)',
    fontSize: 32,
    height: 64,
    width: 64,
  },
  btn: {
    boxShadow: 'none',
    display: 'block',
    width: '100%',
  },
  icon: {
    height: 32,
    width: 32,
  },
  main: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 236,
    padding: theme.spacing.unit * 3,
  },
  name: {
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'left',
    textTransform: 'none',
  },
  popup: {
    borderRadius: 4,
    marginTop: theme.spacing.unit * 1,
  },
})

class AccountPopup extends PureComponent {

  render() {
    const {anchorEl, authSignOut, className, classes, handleRequestClose, open, user} = this.props
    return (
      <Popover
        className={classes.popup}
        elevation={4}
        open={open}
        anchorEl={anchorEl}
        onRequestClose={handleRequestClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classNames(classes.root, className)}>
          <div className={classes.main}>
            <Avatar className={classes.avatar}>J</Avatar>
            <div>
              <Button className={classNames(classes.btn, classes.name)} disableRipple>{user.displayName}</Button>
              <Button
                className={classNames(classes.btn)}
                color="primary"
                component={Link}
                onClick={handleRequestClose}
                raised
                to="/"
              >
                my account
              </Button>
            </div>
          </div>
          <aside className={classes.aside}>
            <Button className={classNames(classes.btn)} onClick={() => authSignOut()}>Sign Out</Button>
          </aside>
        </div>
      </Popover>
    )
  }
}

AccountPopup.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  connect(null, {authSignOut}),
)(AccountPopup)
