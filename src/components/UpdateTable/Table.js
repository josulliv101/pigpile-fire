import React, {PureComponent} from 'react'
import {findDOMNode} from 'react-dom'
import {Field, Form, reduxForm, submit} from 'redux-form'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import List from 'material-ui/List'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
import dot from 'dot-object'
//
import PopupEditor from './PopupEditor'
import Title from './SectionTitle'
import {Subheading} from '../Text'
import Row from './FieldRow'
import InputField from '../../forms/InputField' // default popup editor
import {persistUpdate} from '../../redux/modules/Persist'
import ButtonWithSpinner from '../../forms/ButtonWithSpinner'

const FORM_NAME = 'pile-update-table'
const TextEditor = (props) => <Field {...props} component={InputField} />


const styles = (theme) => ({
  root: {
  	padding: 0,
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
  dialog: {
  	'& $form': {
  		width: 400,
  	},
  },
  form: {},
  popup: {},
  title: {
  	background: theme.palette.grey[700],
  	color: theme.palette.common.white,
  	padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
})

class Table extends PureComponent {

  state = {
    anchorEl: null,
    editor: null,
    open: false,
    // value: null,
  }

  componentWillReceiveProps = (nextProps) => {

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

  dispatchSubmit = () => this.props.dispatch(submit(FORM_NAME))

  handlePersistData = (values) => {
  	const {dispatch, pileId} = this.props
  	console.log('handlePersistData...', dot.dot(values))

  	// Use dot notation to prevent object values from overwriting 
  	// existing properties that are not involved in update.
  	// try , { merge: true } option
  	dispatch(persistUpdate(pileId, values))
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
	  	EditorFrame = !modal ? PopupEditor : Dialog,
	  	...state,
	  } = this.state

	  console.log('STATE', this.state)

	  return (
	    <List 
	    	className={classNames(cls.root, className)}>
	    	{
	    		rows.map(
	    			item => item.type === 'title' 
	    				? <Title key={item.id} {...item} /> 
	    				: <Row 
	    						active={this.state.id === item.id} 
	    						key={item.id} 
	    						{...item} 
	    						setParentState={this.setTableState} 
	    						success={persist.successUi === true} 
	    					/>
	    		)
	    	}
        {
          this.state.open && this.state.id && 
          <EditorFrame 
          	className={classNames({[cls.dialog]: modal}, {[cls.popup]: !modal})}
          	key={`editor-${!modal ? 'popup' : 'dialog'}`}
          	// {...(!modal ? {anchorEl} : {})}
          	// dispatchSubmit={this.dispatchSubmit}
            // handleUpdate={this.handlePersistData}
            onRequestClose={this.handleClose} 
            // persistStatus={persist}
            {...state}>
			    	<Form 
			    	className={cls.form}
							key={FORM_NAME} 
							onSubmit={handleSubmit(this.handlePersistData)} 
							autoComplete="off">
					    <Subheading className={cls.title} heavy>
			          {label || 'Edit'}
			        </Subheading>
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
	reduxForm({form: FORM_NAME, enableReinitialize: true}),
)(Table)
