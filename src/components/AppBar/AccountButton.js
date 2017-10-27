import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import Dots from 'material-ui-icons/MoreVert'
import Edit from 'material-ui-icons/Edit'
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
  edit: {
    color: '#fff',
    paddingLeft: theme.spacing.unit * 1.5,
    position: 'fixed',
    right: theme.spacing.unit * 12,
    top: theme.spacing.unit * .75, // theme.spacing.unit * .5,
    zIndex: theme.zIndex.appBar + 2,
  },
  label: {
  	whiteSpace: 'nowrap',
  },
  icon: {
    height: 32,
    width: 32,
  },
  iconEdit: {
    height: 18,
    marginRight: theme.spacing.unit * 1,
    width: 18,
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
    const {className, classes: cls, drawer, edit = false, setting, user = {}} = this.props
    return (
      <div className={classNames(cls.root, className)}>
      	{ edit && <Button 
      		className={cls.edit} 
      		classes={{label: cls.label}} 
      		color="primary"
      		onClick={() => setting('drawer', !drawer)}
      		raised>
      		<Edit className={cls.iconEdit}  /> Edit
      	</Button> }
        <IconButton
          className={cls.dots}
          component={Link}
          to="/">
          <Dots className={cls.icon} />
        </IconButton>
        <IconButton className={cls.btnAvatar} onClick={this.handleClickButton}>
          <Avatar className={cls.avatar}>J</Avatar>
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
