import React, {Component} from 'react'
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field, getFormValues, reduxForm } from 'redux-form'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import {withStyles} from 'material-ui/styles'
import numeral from 'numeral'
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


  '@keyframes blink': {
    '0%': {opacity: .2},
    '20%': {opacity: 1},
    '100%': {opacity: .2},
  },

  dots: {
    fontSize: 36,
    '&>span': {
      animationName: 'blink',
      animationDuration: '1.0s',
      animationIterationCount: 'infinite',
      animationFillMode: 'both',
      display: 'inline-block',
      position: 'relative',
      top: '-.25em',
    },
    '&>span:nth-child(2)': {
      animationDelay: '.2s',
    },
    '&>span:nth-child(3)': {
      animationDelay: '.4s',
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

  componentWillUnmount = () => {
    console.log('componentWillUnmount', this.props)
  }

  moveCaretAtEnd = (e) => {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  _handleKeyPress = (e) => {

    if (e.key === 'Enter') {
      console.log('_handleKeyPress', e.key, this.props)
      this.props.handleUpdate(this.props.id)
    }
  }

  render() {
    const {anchorEl, className, classes: cls, dirty, fieldType = 'text', formErrors, formMeta, formValues, open, persistStatus = {}, ...data = {}} = this.props
    const {
      anchorOriginVertical,
      anchorOriginHorizontal,
      transformOriginVertical,
      transformOriginHorizontal,
    } = this.state;

    const integerFieldProps = {
      format: value => numeral(value).format('0,0'),
      normalize: value => value && numeral(value).value(),
    }
    const fieldProps = fieldType === 'integer' ? integerFieldProps : {}
    const Dots = props => (
      <div className={cls.dots}>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    )
    console.log('persistStatus', persistStatus)
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
	      
	      <Subheading heavy>Editing {data.id} {formErrors && formErrors[data.id]}</Subheading>
        <Field
          name={data.id}
          className={cls.field}
          component={InputField}
          handleKeyPress={this._handleKeyPress}
          {...fieldProps}
          // format={value => numeral(value).format('0,0')}
          // normalize={value => value && numeral(value).value()}
        />
	      <div className={cls.btnGroup}>
	      	<Button onClick={this.props.handleRequestClose}>Cancel</Button>
	      	<Button color="primary" onClick={this.props.handleUpdate.bind(null, data.id)} raised> 
            {persistStatus.inprocess ? <Dots /> : 'Update'}
          </Button>
	      </div>
	    </Popover>
    )
  }
}

function InputField(field) {
	const {className, input, handleKeyPress = f=>f, meta: {error, touched, warning}, ...custom} = field

	return (
    <TextField
      id={custom.name}
      className={className}
      helperText="Full width!"
      fullWidth
      // margin="none"
      {...input}
      // onFocus={this.moveCaretAtEnd}
      onKeyPress={handleKeyPress}
    />
	)
}


PopupEditor.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(PopupEditor)
