import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import dot from 'dot-object'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
//
import withGetAllThemes from '../../hocs/withGetAllThemes'
import withGetAllTags from '../../hocs/withGetAllTags'

import Table from '../UpdateTable/Table'
import Row from '../UpdateTable/FieldRow'
import Title from '../UpdateTable/SectionTitle'
import LocationField from '../../forms/Location'
import SelectTheme from '../../forms/Themes'
// import SelectTags from '../../forms/Tags'
import SelectList from '../../forms/SelectList'

const ListEditor = (props) => <Field {...props} component={SelectList} />

const styles = (theme) => ({
  root: {},
})

function capitalizeFirstLetter(s) {
		if (!s) return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
}

class ThemeForm extends Component {

	// Split on capital letters
	camelCaseToLabel = (s) => {
		const label = s.split(/(?=[A-Z])/).join(' ')
		return capitalizeFirstLetter(label)		
	}

	themeRows = (activeTheme) => {
		const {name = ''} = activeTheme
		const {pile = {}, tags = {}} = this.props
		const tagsLabel = Object.keys(pile.tags || {}).join(', ')

		return [
			{id: 'subhead1', label: 'Change the theme.', type: 'title'},
			{id: 'theme', label: 'Theme', value: name, editor: SelectTheme},
			{id: 'subheadTags', label: 'Update tags.', type: 'title'},
			{id: 'tags', label: 'Tags', value: tagsLabel, modal: false, editor: (props) => <ListEditor {...props} items={tags} />},
			{id: 'subhead2', label: `Config options for ${name}.`, type: 'title'},
		]
	}

	configRows = (config = {}, userLayout = {}) => Object.keys(config).map(id =>({
		id: `layout.${id}`,
		label: this.camelCaseToLabel(id),
		value: userLayout[id],
	}))

  render() {

    const {
    	activeThemeId,
    	className, 
    	classes: cls, 
    	initialValues = {},
    	pileId,
    	userLayout,
    	// handleSubmit = f => f,
    	persist = {},
    	pile = {},
    	themes = [],
    	rootThemes = themes.filter(({tags}) => tags && tags.root),
    	activeTheme = activeThemeId && themes.find(th => th.id === activeThemeId) || {},
    	config = activeTheme.config,
    } = this.props

    console.log('ownprops test', this.props)
    if (!activeTheme) return null

    const rows = this.themeRows(activeTheme).concat(this.configRows(config, userLayout))
  	return <Table rows={rows} persist={persist} pileId={pileId} initialValues={initialValues} />
  }
}

ThemeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

const pick = ({theme, layout, location, tags}) => ({theme, layout, location, tags})

export default compose(
  withStyles(styles),
  connect((state, {pileId}) => ({
  	initialValues: pick(dot.pick(`pile.pile-${pileId}`, state)),
  	persist: dot.pick(`persist.${pileId}`, state),
  	pile: dot.pick(`pile.pile-${pileId}`, state),
  })),
  withGetAllTags('tags'),
  withGetAllThemes('themes'),
)(ThemeForm)
