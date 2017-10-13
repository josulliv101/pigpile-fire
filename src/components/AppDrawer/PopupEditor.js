import React, {Component} from 'react'
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types'
import classNames from 'classnames'

import compose from 'recompose/compose'
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import {withStyles} from 'material-ui/styles'
//
import {Subheading} from '../Text'

const styles = (theme) => ({
  root: {
  	// minHeight: 200,
  	padding: theme.spacing.unit * 2,
  	width: theme.components.drawer.width - (theme.spacing.unit * 4),
  },
  btnGroup: {
  	alignItems: 'center',
  	display: 'flex',
  	justifyContent: 'flex-end',
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
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class PopupEditor extends Component {

  state = {
    // open: false,
    // anchorEl: null,
    anchorOriginVertical: 'center',
    anchorOriginHorizontal: 'center',
    transformOriginVertical: 'center',
    transformOriginHorizontal: 'center',
  };

  moveCaretAtEnd = (e) => {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  render() {
    const {anchorEl, className, classes: cls, open, ...data = {}} = this.props
    const {
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
    } = this.state;
    return (
	    <Popover
	      open={open}
	      anchorEl={anchorEl}
	      className={classNames(cls.root, className)}
	      onRequestClose={this.props.handleRequestClose}
	      anchorOrigin={{
	        vertical: anchorOriginVertical,
	        horizontal: anchorOriginHorizontal,
	      }}
	      transformOrigin={{
	        vertical: transformOriginVertical,
	        horizontal: transformOriginHorizontal,
	      }}
	    >
	      
	      <Subheading heavy>Editing {data.id}</Subheading>
        <TextField
          id="edit"
          // label="Label"
          className={cls.field}
          InputLabelProps={{
            // shrink: true,
          }}
          // placeholder="Placeholder"
          // multiline
          // rows="8"

          helperText="Full width!"
          fullWidth
          margin="none"
          value={data.value}
          onFocus={this.moveCaretAtEnd}
          autoFocus
        />

	      <div className={cls.btnGroup}>
	      	<Button onClick={this.props.handleRequestClose}>Cancel</Button>
	      	<Button color="primary" raised>Update</Button>
	      </div>
	    </Popover>
    )
  }
}

PopupEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(PopupEditor)
