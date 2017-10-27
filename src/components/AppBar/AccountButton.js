import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import Dots from 'material-ui-icons/MoreVert'
//
import AccountPopup from './AccountPopup'

const styles = (theme) => ({
  root: {
    color: '#fff',
    position: 'fixed',
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * .5,
    zIndex: theme.zIndex.appBar + 2,
  },
  avatar: {
    background: 'rgb(255, 73, 73)',
  },
  btnAvatar: {

  },
  dots: {
    color: '#fff',
    position: 'fixed',
    right: theme.spacing.unit * 6,
    top: 0, // theme.spacing.unit * .5,
    zIndex: theme.zIndex.appBar + 2,
  },
  icon: {
    height: 32,
    width: 32,
  },
})

class AccountButton extends PureComponent {

  state = {
    open: false,
    anchorEl: null,
  }

  handleClickButton = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const {className, classes, user = {}} = this.props
    return (
      <div className={classNames(classes.root, className)}>
        <IconButton
          className={classes.dots}
          component={Link}
          to="/"
        >
          <Dots className={classes.icon} />
        </IconButton>
        <IconButton className={classes.btnAvatar} onClick={this.handleClickButton}>
          <Avatar className={classes.avatar}>J</Avatar>
        </IconButton>
        <AccountPopup {...this.state} handleRequestClose={this.handleRequestClose} user={user} />
      </div>
    )
  }
}

AccountButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(AccountButton)
