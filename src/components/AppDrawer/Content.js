import React, {Component} from 'react'
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import { getFormMeta, getFormSyncErrors, getFormValues, reduxForm } from 'redux-form'
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import {withStyles} from 'material-ui/styles'
import Edit from 'material-ui-icons/Edit';
import Check from 'material-ui-icons/CheckCircle';
//
import EditModal from '../../icons/EditModal'
import {persistUpdate} from '../../redux/modules/Persist'
import PopupEditor from './PopupEditor'
import {Subheading} from '../Text'

const FORM_NAME = 'pile-edit'

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
  item: {
    transition: theme.transitions.create(['background-color']),
    '&$success': {
      backgroundColor: '#dbf5cd',
      color: '#319133',
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
    this.setState({open: false})
    
  }

  handleEditor = (id, value, type) => {
    this.setState({anchorEl: findDOMNode(this[id]), open: true, id, fieldType: type, value})
  }

  handlePersistData = (id) => {

    const {persistStatus = {}} = this.props
    console.log('handlePersistData', id)

    // Ignore multiple update btn clicks
    if (persistStatus.inprocess === true) return

    // Pile id is first param
    this.props.persistUpdate(this.props.id, {[id]: this.props.formValues[id]})

    // Close popup
    // this.setState({open: false})
  }

  render() {
    const {className, classes: cls, dirty, formErrors, formMeta, formValues, persistStatus, ...pile} = this.props
    const {city, state, postal, country} = pile && pile.location || {}
    console.log('form', this.props)
    return [
    	<form onSubmit={ this.props.handleSubmit } autoComplete="off">
        <List
          className={classNames(cls.root, className)}
          dense
          disablePadding
        >
          {<ListSubheader disableSticky heavy>Select a field to edit it.</ListSubheader>}
          <Divider />
          { Item(this, cls, {label: 'title', value: pile.title, success: this.state.id === 'title' && persistStatus.successUi === true}) }
          <Divider />
          { Item(this, cls, {type: 'integer', label: 'goal', value: pile.goal, success: this.state.id === 'goal' && persistStatus.successUi === true}) }
          <Divider />
          { Item(this, cls, {label: 'overview', value: pile.overview}) }
          <Divider />
          { Item(this, cls, {label: 'location', value: `${city}, ${state} ${postal}, ${country}`}) }
          <Divider />
          {/*<ListSubheader disableSticky>People</ListSubheader><Divider />*/}
          
          { Item(this, cls, {label: 'organizer', value: pile.organizer}) }
          <Divider />
          { Item(this, cls, {label: 'beneficiary', value: pile.beneficiary}) }
          <Divider />

          { Item(this, cls, {label: 'story', value: pile.story, modal: true}) }
          <Divider />

          { Item(this, cls, {label: 'updates', value: 'No updates added yet.', modal: true }) }
          <Divider />

          { Item(this, cls, {label: 'images', value: '1 Image', modal: true}) }
          <Divider />

          { Item(this, cls, {label: 'tags', value: Object.keys(pile.tags || {}).join(', ') }) }
          <Divider />

        </List>
        {
          this.state.open && 
          <PopupEditor 
            dirty={dirty} 
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
    <ListItem onClick={() => context.handleEditor(props.label, props.value)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} classes={{container: cls.item}} key={props.label}>
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
    <ListItem onClick={() => context.handleEditor(props.label, props.value, props.type)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} button classes={{container: classNames(cls.item, {[cls.success]: props.success})}} key={props.label}>
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
)(Content)
