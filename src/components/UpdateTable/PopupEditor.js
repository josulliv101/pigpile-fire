import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import {withStyles} from 'material-ui/styles'
//
import {Subheading} from '../Text'
import ButtonWithSpinner from '../../forms/ButtonWithSpinner'

const styles = (theme) => ({
  root: {
  	width: theme.components.drawer.width - (theme.spacing.unit * 4),
  },
  btnGroup: {
  	alignItems: 'center',
  	display: 'flex',
  	justifyContent: 'flex-end',
  	padding: theme.spacing.unit * 2,
  	'&>button:first-child': {
      marginRight: theme.spacing.unit * 1,
  	    opacity: .7,
  	},
  },
  field: {
    backgroundColor: 'rgba(0,0,0,.04)',
    margin: `${theme.spacing.unit * 2}px 0`,
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
  title: {
  	background: theme.palette.grey[700],
  	color: theme.palette.common.white,
  	padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class PopupEditor extends PureComponent {

  render() {

    const {
    	anchorEl, 
      children,
      className, 
      classes: cls, 
      onRequestClose,
      handleUpdate,
      label,
      open, 
      origin,
      persistStatus = {}, 
      // ...data = {},
    } = this.props

    return (
	    <Popover
	      open={open}
	      anchorEl={anchorEl}
	      className={classNames(cls.root, className)}
	      onRequestClose={onRequestClose}
	      anchorOrigin={origin}
	      transformOrigin={origin}
	    > 
        {children}
        {/*
	      <div className={cls.btnGroup}>
	      	<Button onClick={handleRequestClose}>Cancel</Button>
	      	<ButtonWithSpinner 
            color="primary" 
            onClick={this.props.dispatchSubmit} 
            raised
            type="submit"
            spinning={persistStatus.inprocess}
          > 
            Update
          </ButtonWithSpinner>
	      </div>
      */}
	    </Popover>
    )
  }
}

PopupEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PopupEditor.defaultProps = {
  handleRequestClose: f => f,
  handleUpdate: f => f,
  origin: {vertical: 'center', horizontal: 'center'},
}

export default compose(
  withStyles(styles),
)(PopupEditor)
