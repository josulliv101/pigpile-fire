import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const FORM_NAME = 'pile-edit-theme'

const styles = (theme) => ({
  root: {

  },
  [theme.breakpoints.up(948)]: {
    root: {},
  },
})

class UpdateTable extends Component {

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

    const {formValues, persistStatus = {}, sidebarTypePreview, textPositionPreview, textStylePreview} = this.props
    console.log('handlePersistData', id)

    // Ignore multiple update btn clicks
    if (persistStatus.inprocess === true) return
    const split = id.split('.')
    let update = split.length === 2 ? formValues[split[0]][split[1]] : formValues[id]

    console.log(id, update)
    // Pile id is first param
    // this.props.persistUpdate(this.props.id, {[id]: update})
    const textStyle = textStylePreview && {[`textStyle-${textStylePreview}`]: true}
    const textPosition = textPositionPreview && {[`textPosition-${textPositionPreview}`]: true}
    const sidebarType = sidebarTypePreview && {[`sidebarType-${sidebarTypePreview}`]: true}
    this.props.persistUpdate(this.props.id, {layout: {theme: update, ...sidebarType, ...textStyle, ...textPosition}})

    // Close popup
    // this.setState({open: false})
  }

  render() {
    const {className, classes: cls, dirty, formErrors, formMeta, formValues, persistStatus, ...pile} = this.props
    const {city, state, postal, country} = pile && pile.location || {}
    console.log('form', this.props)
    const showConfigColor = pile.layout.theme.startsWith('themeWave')
    const showConfigLayoutImage = pile.layout.theme.startsWith('layoutImage')
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
          { showConfigColor && Item(this, cls, {label: 'color', value: 'Grey', success: this.state.id === 'color' && persistStatus.successUi === true }) }
          { showConfigColor && <Divider />}
          { showConfigLayoutImage && Item(this, cls, {label: 'titleStyle', value: '1', success: this.state.id === 'titleStyle' && persistStatus.successUi === true }) }
          { showConfigLayoutImage && <Divider />}
          { showConfigLayoutImage && Item(this, cls, {label: 'titlePosition', value: '1', success: this.state.id === 'titlePosition' && persistStatus.successUi === true }) }
          { showConfigLayoutImage && <Divider />}
          { showConfigLayoutImage && Item(this, cls, {label: 'sidebarType', value: '1', success: this.state.id === 'sidebarType' && persistStatus.successUi === true }) }
          { showConfigLayoutImage && <Divider />}
        </List>
        {
          this.state.modal === false && this.state.open && 
          <PopupEditor 
            dirty={dirty} 
            change={this.props.change}
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

Theme.propTypes = {
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
    textStylePreview: state.settings && state.settings.textStylePreview,
    textPositionPreview: state.settings && state.settings.textPositionPreview,
    sidebarTypePreview: state.settings && state.settings.sidebarTypePreview,
  }), {persistUpdate}),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: true, validate}),
  // withGetAllTags(),
)(Theme)
