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
// 
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

class ThemeForm extends Component {

	// Split on capital letters
	camelCaseToLabel = (s) => {
		const label = s.split(/(?=[A-Z])/).join(' ')
		return capitalizeFirstLetter(label)		
	}

	themeRows = () => {
		const {pile = {}, themes = []} = this.props
		// const pileTags = Object.keys(pile.tags || {}).join(', ')
		console.log('themerows', themes)
		return [
			{id: 'theme-settings', label: 'Change theme settings.', type: 'title'},
			{id: 'theme', label: 'Theme', value: pile.theme && pile.theme.id, editor: (props) => <SelectTheme items={themes} />},
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

    console.log('THEME FORM props', this.props)

  	return <Table 
  					form="pile-update-theme" 
  					rows={this.themeRows()} 
  					persist={persist} 
  					pileId={pileId} 
  					initialValues={initialValues} 
  				 />
  }
}

ThemeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

const pick = ({theme}) => ({theme})

export default compose(
  withStyles(styles),
  connect((state, {pileId, pile = {}}) => ({
  	initialValues: pick(pile),
  	persist: dot.pick(`persist.${pileId}`, state),
  	// pile: dot.pick(`pile.pile-${pileId}`, state),
  })),
  withGetAllThemes('themes'),
)(ThemeForm)
