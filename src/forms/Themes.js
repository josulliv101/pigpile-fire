import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Field} from 'redux-form'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {withStyles} from 'material-ui/styles'
import Check from 'material-ui-icons/CheckCircle';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
//
// import InputField from './InputField'
import * as themes from '../style/appThemes'
import {setting} from '../redux/modules/Settings'

const styles = (theme) => ({
  root: {
  	backgroundColor: 'rgba(0,0,0,.04)',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class Themes extends Component {

	componentWillUnmount = () => this.props.setting('themePreview', null)

	handleClick = (id) => {
		console.log('id', id, this.props)
	}

  render() {
  	const {classes: cls, className, setting} = this.props;
    return (
	    <Field 
      	name="layout.theme" 
      	className={classNames(cls.root)}
      	component={ThemeField} 
      	setting={setting}
        themes={themes}
        // onChange={() => console.log('select')}
      />
    )
  }
}


const themeCategories = [
	{id: 'pageHome', isTheme: true, label: 'Pigpile Farm Landscape'},
	{id: 'wave', isTheme: false, label: 'Wave Theme', themes: [
		{id: 'themeWaveGrey', isTheme: true, label: 'Grey'},
		{id: 'themeWaveBlue', isTheme: true, label: 'Blue'},
		{id: 'themeWaveGreyLite', isTheme: true, label: 'Light Grey'},
		{id: 'themeWavePink', isTheme: true, label: 'Pink'},
	]},
	{id: 'themeSelfAsBg', isTheme: true, label: 'Use main image as background'},
	{id: 'layoutImage', isTheme: true, label: 'Panoramic Theme'},
]

class ThemeField extends Component {

	// Holds toggle value for theme categories
	state = {}

  handleChange = (item) => {
    const {input} = this.props
    console.log(item)

    // Toggle visibility state
    if (!item.isTheme) this.setState({[item.id]: !this.state[item.id]})

    // Controls show/hide config options
    if (item.isTheme) input.onChange(item.id);

    // Make available to all cmps that need to know
    if (item.isTheme) this.props.setting('themePreview', item.id)
  }
	
	renderListItem = (item, {inset = false} = {}) => (
  	<ListItem key={`theme-cat-${item.id}`} button divider key={item.id} onClick={this.handleChange.bind(this, item)}>
      <ListItemText primary={item.label} inset={inset} />
      {
        !item.themes && this.props.input.value === item.id && 
        <ListItemIcon>
          <Check style={{marginRight: 0}} />
        </ListItemIcon>
      }
      {
        item.themes && 
        <ListItemIcon>
          {!this.state[item.id] ? <ExpandMore style={{marginRight: 0}} /> : <ExpandLess style={{marginRight: 0}} />}
        </ListItemIcon>
      }
  	</ListItem>
	)

  render() {
    const {input, setting, themes = [], ...props} = this.props
    console.log('ThemeField', themes, props, input)

    const listItems = themeCategories.reduce((sum = [], item) => {
    	sum.push(this.renderListItem(item))
    	console.log('child themes', item.themes)
    	// Grab children items too
    	return item.themes && this.state[item.id]
    		? sum.concat(<div style={{display: 'flex', justifyContent: 'space-between'}}>{item.themes.map(child => this.renderListItem(child, {inset: false}))}</div>)
    		: sum
    }, []) 

    return (
      <List dense {...props}>
        {listItems}
      </List>
    )    
  }
}

Themes.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  connect(null, {setting}),
)(Themes)
