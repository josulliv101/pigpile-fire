import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Field, Form, reduxForm, submit} from 'redux-form'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import List from 'material-ui/List'
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
import dot from 'dot-object'
//
import PopupEditor from './PopupEditor'
import Title from './SectionTitle'
import {Subheading} from '../Text'
import Row from './FieldRow'
import RowSwitch from './FieldRowSwitch'
import InputField from '../../forms/InputField' // default popup editor
import {persistUpdate} from '../../redux/modules/Persist'
import ButtonWithSpinner from '../../forms/ButtonWithSpinner'

// const FORM_NAME = 'pile-update-theme'
const TextEditor = (props) => <Field {...props} component={InputField} fullWidth />


const styles = (theme) => ({
  root: {
  	backgroundColor: '#fafafa',
  	opacity: 1,
  	padding: 0,
  	transition: theme.transitions.create(['background-color', 'opacity']),
  	'&$disable': {
  		backgroundColor: '#eee',
  		opacity: .7,
  	},
  },
  bd: {
  	padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`,
  },
  btnGroup: {
  	alignItems: 'center',
  	display: 'flex',
  	justifyContent: 'flex-end',
  	padding: 0, // theme.spacing.unit * 2,
  	'&>button:first-child': {
      marginRight: theme.spacing.unit * 1,
  	    opacity: .7,
  	},
  },
  dialog: {
  	'& $form': {
  		height: 500,
  		width: 600,
  	},
  },
  disable: {},
  form: {
  	margin: 0,
  },
  hide: {
  	visibility: 'hidden',
  },
  popup: {},

  title: {
  	background: theme.palette.grey[700],
  	color: theme.palette.common.white,
  	padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
})

class Table extends Component {

  state = {
    anchorEl: null,
    editor: null,
    open: false,
    // value: null,
  }

  componentWillReceiveProps = (nextProps) => {
  	console.log('table componentWillReceiveProps', nextProps)
    // Detect an update success, then close dialog
    if (this.props.persist.inprocess === true && nextProps.persist.inprocess === false && nextProps.persist.done === true) {
      this.setState({open: false})
    }
  }

  handleClose = () => {
    this.setState({
    	// 'id' cannot be reset here because we need to know which was the 
    	// active field in order to show a success/error style.
    	open: false,
    	editor: null,
    })

    // Clear if any form values changed but not saved.
    this.props.reset()
  }

  handleEditor = (ev) => {
  	console.log('handlePopupEditor', ev.currentTarget)
    // this.props.history.push({state: id})
    this.setState({
      anchorEl: ev.currentTarget, 
      open: true, 
    })
  }

  dispatchSubmit = () => this.props.dispatch(submit(this.props.form))

  handlePersistData = (values) => {
  	const {dispatch, pileId} = this.props
  	const {id, stringify} = this.state
  	console.log('handlePersistData...', id, values)

  	// Move any stringify or merge ect to saga?
  	let update = {[id]: typeof values[id] === 'object' && stringify ? JSON.stringify(values[id]) : values[id]} 
/*
  	if (this.state.stringify) {
  		update = Object.keys(values).reduce((sum, key) => {
  			sum[key] = JSON.stringify(values[key])
  			return sum
  		}, {})
  	}
*/
  	// Use dot notation to prevent object values from overwriting 
  	// existing properties that are not involved in update.
  	// try , { merge: true } option
  	dispatch(persistUpdate(pileId, update))
  }

  onEditorEntered = (node) => {
  	const {controlValue, id, isSwitch} = this.state
  	console.log('onEnter', id, isSwitch, controlValue)
  	if (id && isSwitch) {
  		// this.props.change(id, !controlValue)
  		this.dispatchSubmit()
  	}
  }

  // Avoid having to use arrow-function or use bind in onClick handler
  setTableState = update => this.setState(update)

	render() {
	  const {
	  	children, 
	  	classes: cls, 
	  	className, 
	  	handleSubmit, 
	  	persist, 
	  	rows = [],
	  } = this.props

	  const {
	  	// anchorEl,
	  	editor: Editor = TextEditor, 
	  	id,
	  	label,
	  	modal = false,
	  	stringify = false,
	  	EditorFrame = !modal ? PopupEditor : Dialog,
	  	...state,
	  } = this.state

	  console.log('STATE', this.state)
	  console.log('PROPS', this.props)

	  return (
	    <List 
	    	className={classNames(cls.root, {[cls.disable]: this.state.open}, className)}
	    	dense
	    	>
	    	{
	    		rows.map(
	    			(item, i, arg, RowCmp = item.switch ? Row : Row) => item.type === 'title' 
	    				? <Title key={item.id} {...item} /> 
	    				: <RowCmp 
	    						active={this.state.id === item.id} 
	    						key={item.id} 
	    						{...item} 
	    						setParentState={this.setTableState} 
	    						success={persist.successUi === true} 
	    						// Needed for Switches since they don't have a popup editor
	    						handlePersistData={this.handlePersistData}
	    					/>
	    		)
	    	}
        {
          this.state.open && this.state.id && 
          <EditorFrame 
          	className={classNames({[cls.hide]: this.state.isSwitch}, {[cls.dialog]: modal}, {[cls.popup]: !modal})}
          	key={`editor-${!modal ? 'popup' : 'dialog'}`}
          	// {...(!modal ? {anchorEl} : {})}
          	// dispatchSubmit={this.dispatchSubmit}
            // handleUpdate={this.handlePersistData}
            onRequestClose={this.handleClose} 
            onEntering={this.onEditorEntered}
            // persistStatus={persist}
            {...state}>
			    	<Form 
			    	  className={cls.form}
							key={this.props.form} 
							onSubmit={handleSubmit(this.handlePersistData)} 
							autoComplete="off">
					    <Subheading className={cls.title} heavy>
			          {label || 'Edit'}
			        </Subheading>
			        <div className={cls.bd}>
				    		<Editor name={id} setParentState={this.setTableState}  />
					      <div className={cls.btnGroup}>
					      	<Button onClick={this.handleClose}>Cancel</Button>
					      	<ButtonWithSpinner 
				            color="primary" 
				            onClick={this.dispatchSubmit} 
				            raised
				            type="submit"
				            spinning={persist.inprocess}
				          > 
				            Update
				          </ButtonWithSpinner>
					      </div>
					    </div>
			      </Form>
          </EditorFrame>
        }
	    </List>
	  )		
	}
}

Table.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
	withStyles(styles),
	reduxForm({
		//form: FORM_NAME, 
		// So new values can be established when an item is persisted to db
		enableReinitialize: true,
	}),
)(Table)
