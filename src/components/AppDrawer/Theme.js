import React, {Component} from 'react'
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import { getFormMeta, getFormSyncErrors, getFormValues, reduxForm } from 'redux-form'
import IconButton from 'material-ui/IconButton';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import {withStyles} from 'material-ui/styles'
import Edit from 'material-ui-icons/Edit';
import Check from 'material-ui-icons/CheckCircle';
import serialize from 'serialize-javascript'
//
// import withGetAllTags from '../../hocs/withGetAllTags'
import EditModal from '../../icons/EditModal'
import {persistUpdate} from '../../redux/modules/Persist'
import PopupEditor from './PopupEditor'
import EditorField from '../../forms/Editor'
import {Subheading} from '../Text'

const FORM_NAME = 'pile-edit-theme'

const validate = values => {
  const errors = {}
  if (!values.goal) {
    errors.goal = 'A goal amount is required.'
  }

  if (!Number.isInteger(values.goal)) {
    errors.goal = 'A goal amount must be an integer.'
  }

  if (values.goal < 5) {
    errors.goal = 'A goal amount must be atleast $5.'
  }

  return errors
}

const styles = (theme) => ({
  root: {
    // padding: theme.spacing.unit * 2,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  btn: {
    backgroundColor: theme.palette.common.faintBlack,
    marginRight: theme.spacing.unit * 2,
    minWidth: 126,
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
  dialog: {
  	// height: 400,
  	minWidth: 660,
  },
  form: {
    opacity: 1,
    transition: theme.transitions.create(['opacity']),
    '&$withPopup': {
      opacity: .5,
    },
  },
  item: {
    transition: theme.transitions.create(['background-color']),
    '&$success': {
      backgroundColor: '#dbf5cd',
      color: '#319133',
      '&>li:hover': {
        backgroundColor: '#dbf5cd',
      },
      '& $icon': {
        opacity: 1,
      },
    },
    '&:hover': {
      '& $icon': {
        opacity: 1,
      },
    },
  },
  icon: {
    opacity: 0,
  },
  listSection: {
    background: 'inherit',
  },
  success: {},
  [theme.breakpoints.up(948)]: {
    root: {},
  },
  withPopup: {},
})

class Content extends Component {

  state = {
    anchorEl: null,
    id: null,
    open: false,
    value: null,
  }

  componentWillReceiveProps = (nextProps) => {

    // Detect an update success, then close dialog
    if (this.props.persistStatus.inprocess === true && nextProps.persistStatus.inprocess === false && nextProps.persistStatus.done === true) {
      this.setState({open: false})
    }
  }
  handleClose = () => {
    console.log('handleClose')
    // Popup cancelled, reset value
    this.props.reset()
    this.props.history.push({state: null})
    this.setState({open: false})

  }

  handleEditor = (id, value, type, multiline = false, modal = false) => {
    this.props.history.push({state: id})
    this.setState({
      anchorEl: findDOMNode(this[id]), 
      open: true, 
      id, 
      fieldType: type, 
      modal,
      multiline, 
      value
    })
  }

  handlePersistData = (id) => {

    const {formValues, persistStatus = {}} = this.props
    console.log('handlePersistData', id)

    // Ignore multiple update btn clicks
    if (persistStatus.inprocess === true) return
    const split = id.split('.')
    let update = split.length === 2 ? formValues[split[0]][split[1]] : formValues[id]

    console.log(id, update)
    // Pile id is first param
    this.props.persistUpdate(this.props.id, {[id]: update})

    // Close popup
    // this.setState({open: false})
  }

  render() {
    const {className, classes: cls, dirty, formErrors, formMeta, formValues, persistStatus, ...pile} = this.props
    const {city, state, postal, country} = pile && pile.location || {}
    console.log('form', this.props)
    return [
    	<form key="pile-edit" className={classNames(cls.form, {[cls.withPopup]: this.state.open})} onSubmit={ this.props.handleSubmit } autoComplete="off">
        <List
          className={classNames(cls.root, className)}
          dense
          disablePadding
          key="fields"
        >
          {<ListSubheader disableSticky>Change the Theme</ListSubheader>}
          <Divider />
          { Item(this, cls, {label: 'layout.theme', value: pile.layout && pile.layout.theme, success: this.state.id === 'themes' && persistStatus.successUi === true }) }
          <Divider />
          {<ListSubheader disableSticky>Config Options for the Wave theme</ListSubheader>}
          <Divider />
          { Item(this, cls, {label: 'color', value: 'Grey', success: this.state.id === 'color' && persistStatus.successUi === true }) }
          <Divider />
        </List>
        {
          this.state.modal === false && this.state.open && 
          <PopupEditor 
            dirty={dirty} 
            key="popup-editor-theme"
            handleUpdate={this.handlePersistData}
            formErrors={formErrors} 
            formMeta={formMeta} 
            formValues={formValues} 
            handleRequestClose={this.handleClose} 
            persistStatus={persistStatus}
            {...this.state} 
          />
        }
      </form>
    ]
  }
}

function ItemSwitch(context, cls, props) {
  return (
    <ListItem onClick={() => context.handleEditor(props.label, props.value, props.type, props.multiline, props.modal)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} classes={{container: cls.item}} key={props.label}>
      <Subheading align="right" className={cls.btn} heavy>{props.label}</Subheading>
      <Subheading heavy noWrap>Fundraiser is currently {props.value ? 'active' : 'inactive'}.</Subheading>
      <ListItemSecondaryAction>
        <Switch
          // onClick={this.handleToggle('bluetooth')}
          checked={props.value}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function Item(context, cls, props) {
  return (
    <ListItem onClick={() => context.handleEditor(props.label, props.value, props.type, props.multiline, props.modal)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} button classes={{container: classNames(cls.item, {[cls.success]: props.success})}} key={props.label}>
      <Subheading align="right" className={classNames(cls.btn)} heavy>{props.label}</Subheading>
      <Subheading heavy noWrap>{props.value}</Subheading>
      <ListItemSecondaryAction className={cls.icon}>
        <IconButton tabIndex="-1">
          {props.success !== true ? (props.modal ? <EditModal /> : <Edit />) : <Check style={{color: 'rgb(136, 188, 122)'}} />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  connect((state, {idParam}) => ({
    formErrors: getFormSyncErrors(FORM_NAME)(state),
    formMeta: getFormMeta(FORM_NAME)(state),
    formValues: getFormValues(FORM_NAME)(state),
    persistStatus: state.persist[idParam] || {},
  }), {persistUpdate}),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: true, validate}),
  // withGetAllTags(),
)(Content)
