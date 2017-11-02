import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import dot from 'dot-object'
import numeral from 'numeral'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
import {convertFromRaw} from 'draft-js'
//
import withGetAllThemes from '../../hocs/withGetAllThemes'
import withGetAllTags from '../../hocs/withGetAllTags'
import Table from '../UpdateTable/Table'
import Row from '../UpdateTable/FieldRow'
import Title from '../UpdateTable/SectionTitle'
import LocationField from '../../forms/Location'
import SelectTheme from '../../forms/SelectTheme'
// import SelectTags from '../../forms/Tags'
import SelectList from '../../forms/SelectList'
import DraftJsEditor from '../../forms/Editor'
import CheckboxField from '../../forms/CheckboxField'

const ListEditor = (props) => <Field {...props} component={SelectList} />
const ThemeEditor = (props) => <Field {...props} component={SelectTheme} />
const ContentEditor = (props) => <Field {...props} component={DraftJsEditor} />

class SwitchEditor extends Component {

	componentDidMount = () => {
		console.log('onMount')
	}

	render() {
		return <Field {...this.props} component={CheckboxField} autoToggle={true} />
	}
}

const styles = (theme) => ({
  root: {},
})

function capitalizeFirstLetter(s) {
		if (!s) return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const getDraftPlainText = (value) => {
	if (!value) return ''
	const raw = typeof value === 'string' ? JSON.parse(value) : value
	const contentState = convertFromRaw(raw)
	return contentState.getPlainText()
}

const getLocationLabel = (loc = {}) => {
	return `${loc.city}, ${loc.state}`
}

class ContentForm extends Component {

	// Split on capital letters
	camelCaseToLabel = (s) => {
		const label = s.split(/(?=[A-Z])/).join(' ')
		return capitalizeFirstLetter(label)		
	}

	contentRows = () => {
		const {pile = {}, tagsAll = {}} = this.props
		const pileTags = Object.keys(pile.tags || {}).join(', ')
		console.log('location label', pile.location)
		return [
			{id: 'edit', label: 'Edit a field.', type: 'title'},
			{id: 'title', label: 'Title', value: pile.title},
			{id: 'goal', label: 'Goal', value: numeral(pile.goal).format('$0,0')},
			
			{id: 'beneficiary', label: 'Beneficiary', value: pile.beneficiary},
			{
				id: 'overview', 
				label: 'Overview', 
				value: getDraftPlainText(pile.overview), 
				modal: true, 
				editor: (props) => <ContentEditor {...props} stringify={true} />,
			},
			{id: 'organizer', label: 'Organizer', value: pile.organizer},
			{
				id: 'story', 
				label: 'Story', 
				value: getDraftPlainText(pile.story), 
				modal: true, 
				editor: (props) => <ContentEditor {...props} stringify={true} />,
			},
			{
				id: 'location', 
				label: 'Location', 
				value: getLocationLabel(pile.location), 
				editor: LocationField,
			},
			{
				id: 'tags', 
				label: 'Tags', 
				value: pileTags, 
				editor: (props) => <ListEditor {...props} items={tagsAll} multi={true} />,
			},
			// This is a modal because the Popup isn't firing the onEnter callback, but modal works properly.
			{ 
				id: 'isPrivate', 
				modal: true, 
				label: 'Private', 
				controlValue: pile.isPrivate, 
				value: pile.isPrivate ? '' : '', 
				editor: SwitchEditor, 
				switch: true, 
				isSwitch: true },
		]
	}

  render() {

    const {
    	className, 
    	classes: cls, 
    	initialValues = {},
    	pileId,
    	// handleSubmit = f => f,
    	persist = {},
    	pile = {},
    } = this.props

    console.log('CONTENT FORM props', this.props)

  	return <Table 
  					form="pile-update-content" 
  					rows={this.contentRows()} 
  					persist={persist} 
  					pileId={pileId} 
  					initialValues={initialValues} 
  				 />
  }
}

ContentForm.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

const pick = ({title, goal, overview, organizer, beneficiary, story, tags, location, isPrivate}) => ({title, goal, overview, organizer, beneficiary, story, tags, location, isPrivate})

export default compose(
  withStyles(styles),
  connect((state, {pileId, pile = {}}) => ({
  	initialValues: pick(pile),
  	persist: dot.pick(`persist.${pileId}`, state),
  	// pile: dot.pick(`pile.pile-${pileId}`, state),
  })),
  withGetAllTags('tagsAll'),
  // withGetAllThemes('themes'),
)(ContentForm)
