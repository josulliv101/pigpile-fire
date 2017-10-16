import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Field} from 'redux-form'
import compose from 'recompose/compose'
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import {withStyles} from 'material-ui/styles'
import numeral from 'numeral'
//
import {Subheading} from '../Text'
import InputField from '../../forms/InputField'
import LocationField from '../../forms/Location'
import TagsField from '../../forms/Tags'
import ButtonWithSpinner from '../../forms/ButtonWithSpinner'

const styles = (theme) => ({
  root: {
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

const fieldToCmpMap = {
  location: LocationField,
  tags: TagsField,
}

class PopupEditor extends Component {

  moveCaretAtEnd = (e) => {
    var temp_value = e.target.value
    e.target.value = ''
    e.target.value = temp_value
  }

  _handleKeyPress = (e) => {
    const {id} = this.props;
    if (id !== 'overview' && e.key === 'Enter') {
      console.log('_handleKeyPress', e.key, this.props)
      this.props.handleUpdate(this.props.id)
    }
  }

  render() {
    const {anchorEl, className, classes: cls, dirty, fieldType = 'text', formErrors, formMeta, formValues, open, persistStatus = {}, ...data = {}} = this.props

    const integerFieldProps = {
      format: value => numeral(value).format('0,0'),
      normalize: value => value && numeral(value).value(),
    }
    const fieldProps = fieldType === 'integer' ? integerFieldProps : {}
    const props = {
      name: data.id,
      className: cls.field,
      component: fieldToCmpMap[data.id] || InputField,
      fullWidth: true,
      handleKeyPress: this._handleKeyPress,
      multiline: data.multiline,
      rowsMax: 8,
    }
    console.log('data', data)
    return (
	    <Popover
	      open={open}
	      anchorEl={anchorEl}
	      className={classNames(cls.root, className)}
	      onRequestClose={this.props.handleRequestClose}
	      anchorOrigin={{vertical: 'center', horizontal: 'center',}}
	      transformOrigin={{vertical: 'center', horizontal: 'center',}}
	    > 
	      <Subheading heavy>
          Editing {data.id} {formErrors && formErrors[data.id]}
        </Subheading>
        <Field {...props} {...fieldProps} />
	      <div className={cls.btnGroup}>
	      	<Button onClick={this.props.handleRequestClose}>Cancel</Button>
	      	<ButtonWithSpinner 
            color="primary" 
            onClick={this.props.handleUpdate.bind(null, data.id)} 
            raised
            spinning={persistStatus.inprocess}
          > 
            Update
          </ButtonWithSpinner>
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
