import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Field} from 'redux-form'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles'
import Check from 'material-ui-icons/CheckCircle';
import CheckSmall from 'material-ui-icons/Check';
import CheckBox from 'material-ui-icons/RadioButtonChecked';
import CheckBoxOutline from 'material-ui-icons/RadioButtonUnchecked';
import Collapse from 'material-ui/transitions/Collapse'

//
// import InputField from './InputField'
import * as themes from '../style/appThemes'
import {setting} from '../redux/modules/Settings'
import withGetAllThemes from '../hocs/withGetAllThemes'

const styles = (theme) => ({
  root: {
  	backgroundColor: 'rgba(0,0,0,.04)',
  },
  select: {
  	width: '100%',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

const themeCategories = [
	{id: 'pageHome', isTheme: true, label: 'Pigpile Farm Landscape', topLevel: true},
	{id: 'wave', isTheme: false, label: 'Wave Theme', topLevel: true, themes: [
		{id: 'themeWaveGrey', isTheme: true, label: 'Grey', parentId: 'wave', sampleColor: '#999'},
		{id: 'themeWaveBlue', isTheme: true, label: 'Blue', parentId: 'wave', sampleColor: '#6699cc'},
		{id: 'themeWaveGreyLite', isTheme: true, label: 'Light Grey', parentId: 'wave', sampleColor: '#DDD'},
		{id: 'themeWavePink', isTheme: true, label: 'Pink', parentId: 'wave', sampleColor: 'pink'},
	]},
	{
		id: 'self', 
		// isTheme: true, 
		label: 'Use main image as background', 
		topLevel: true,
		themes: [
			{id: 'themeSelfAsBg', isTheme: true, label: 'Light', parentId: 'self', sampleColor: '#ccc'},
			{id: 'themeSelfAsBgDark', isTheme: true, label: 'Dark', parentId: 'self', sampleColor: '#666'},
			{id: 'themeSelfAsBgBlue', isTheme: true, label: 'Blue', parentId: 'self', sampleColor: '#1a6fc3'},
			{id: 'themeSelfAsBgGreen', isTheme: true, label: 'Green', parentId: 'self', sampleColor: 'green'},
			{id: 'themeSelfAsBgRed', isTheme: true, label: 'Red', parentId: 'self', sampleColor: 'red'},
		],
	},
	{
		id: 'layoutImage', 
		isTheme: true, 
		label: 'Panoramic Theme',
		topLevel: true,
		sidebarType: true,
		textStyle: true,
		textPosition: true,
	},
]


class Themes extends Component {

	componentWillUnmount = () => {
		this.props.setting('themePreview', null)
		this.props.setting('textStylePreview', null)
		this.props.setting('textPositionPreview', null)
		this.props.setting('sidebarTypePreview', null)

	}
	handleClick = (id) => {
		console.log('id', id, this.props)
	}

  render() {
  	const {change, classes: cls, className, setting} = this.props;
    return (
	    <Field 
      	name="layout.theme" 
      	// change={change}
      	className={classNames(cls.root)}
      	component={ThemeField} 
      	setting={setting}
        themes={themes}
        // onChange={() => console.log('select')}
      />
    )
  }
}


class ThemeField extends Component {

	// Holds toggle value for theme categories
	state = {
		activeCategory: null,
	}

	handleSidebarTypeChange = (ev) => {
		console.log(ev.target.value)
		// if (item.isTheme) input.onChange(item.id);
		// this.props.setting('sidebarTypePreview', n)
		this.props.setting('sidebarTypePreview', ev.target.value)
	}

	handleTextStyleChange = (ev) => {
		console.log(ev.target.value)
		// if (item.isTheme) input.onChange(item.id);
		this.props.setting('textStylePreview', ev.target.value)
	}

	handleTextPositionChange = (ev) => {
		console.log(ev.target.value)
		// if (item.isTheme) input.onChange(item.id);
		// this.props.setting('textPositionPreview', n)
		this.props.setting('textPositionPreview', ev.target.value)
	}

  handleThemeChange = (item, categoryId) => {
    const {input} = this.props
    console.log(item)

    // Toggle visibility state
    // if (!item.isTheme) 
    // this.setState({[item.id]: !this.state[item.id]})
    this.setState({activeCategory: categoryId || item.id})

    // Controls show/hide config options
    if (item.isTheme) input.onChange(item.id);

    // Make available to all cmps that need to know
    if (item.isTheme) this.props.setting('themePreview', item.id)
  }
	
	renderListItem = (item, {categoryId, dense = false, inset = false} = {}) => (
  	<ListItem dense={dense} key={`theme-cat-${item.id}`} button divider key={item.id} onClick={this.handleThemeChange.bind(this, item, categoryId)}>
      {
      	item.sampleColor && <Button raised style={{minWidth: 24, minHeight: 24, padding: 0,background: item.sampleColor, marginRight: 0, height: 24, width: 24, border: '2px #fff solid'}}> </Button>
      }
      <ListItemText primary={item.label} inset={inset} />
      {
        !item.themes && this.props.input.value === item.id && 
        <ListItemIcon>
          {item.topLevel ? <CheckSmall style={{marginRight: 0}} /> : <CheckBox style={{width: 20, height: 20, marginRight: 0}} />}
        </ListItemIcon>
      }
      {
        !item.themes && this.props.input.value !== item.id && !item.topLevel && 
        <ListItemIcon>
          <CheckBoxOutline style={{width: 20, height: 20, marginRight: 0}} />
        </ListItemIcon>
      }
      {
        item.themes && this.state.activeCategory === item.id &&
        <ListItemIcon>
          <CheckSmall style={{marginRight: 0}} />
        </ListItemIcon>
      }
  	</ListItem>
	)

	categoryHasActiveTheme = (activeId, themes) => themes.some(theme => theme.id === activeId)

	componentDidUpdate = (prevProps, prevState) => {
		const {activeCategory:active} = this.state

		if (active === prevState.activeCategory) return 

		// Check if category changed
		console.log('state', active)
		const category = themeCategories.find(cat => cat.id === active)
		console.log('theme', category)
		if (category && category.themes && !this.categoryHasActiveTheme(active, category.themes)) {
			// this.props.setting('themePreview', category.themes[0].id)

			this.handleThemeChange(category.themes[0], category.id)
		}
	}

  render() {
    const {classes: cls, input, setting, themes = [], ...props} = this.props
    console.log('ThemeField', themes, props, input)

    const listItems = themeCategories.reduce((sum = [], item) => {
    	sum.push(this.renderListItem(item))
    	console.log('child themes', item.themes)
    	// Grab children items too
    	sum = item.themes 
    		? sum.concat(
    			<div style={{}}>
    				<Collapse in={this.state.activeCategory === item.id} transitionDuration="auto" >
    					{item.themes.map(child => this.renderListItem(child, { categoryId: item.id, dense: true, inset: false}))}
    				</Collapse>
    			</div>
    		)
    		: sum

    	sum = item.textStyle === true 
    		? sum.concat(
	    			<Collapse in={this.state.activeCategory == item.id} transitionDuration="auto" >
			         <TextField
			          id="select-title-style"
			          select
			          // label="Title Style"
			          style={{padding: '8px 16px 4px', width: '100%'}}
			          value={1}
			          onChange={this.handleTextStyleChange}
			          SelectProps={{
			            MenuProps: {
			              // className: cls.menu,
			              
			            },
			          }}
			          helperText="Please select your currency"
			          margin="none"
			        >
			          {[1,2,3,4].map(n => (
			            <MenuItem key={n} value={n}>
			              style {n}
			            </MenuItem>
			          ))}
			        </TextField>
		    		</Collapse>
    			)
    		: sum

    	sum = item.textPosition === true 
    		? sum.concat(
	    			<Collapse in={this.state.activeCategory == item.id} transitionDuration="auto" >
			         <TextField
			          id="select-title-position"
			          select
			          // label="Title Position"
			          style={{padding: '4px 16px', width: '100%'}}
			          value={1}
			          onChange={this.handleTextPositionChange}
			          SelectProps={{
			            MenuProps: {},
			          }}
			          helperText="Position the title."
			          margin="none"
			        >
			          {['top', 'bottom', 'top-right'].map((key, n) => (
			            <MenuItem key={key} value={n+1}>
			              {key}
			            </MenuItem>
			          ))}
			        </TextField>
		    		</Collapse>
    			)
    		: sum

    	sum = item.sidebarType === true 
    		? sum.concat(
 	    			<Collapse in={this.state.activeCategory == item.id} transitionDuration="auto" >
			         <TextField
			          id="select-sidebar-type"
			          select
			          // label="Title Position"
			          style={{padding: '4px 16px', width: '100%'}}
			          value={1}
			          onChange={this.handleSidebarTypeChange}
			          SelectProps={{
			            MenuProps: {},
			          }}
			          helperText="Position the sidebar."
			          margin="none"
			        >
			          {['default', 'bottom', 'small'].map((key, n) => (
			            <MenuItem key={key} value={n+1}>
			              {key}
			            </MenuItem>
			          ))}
			        </TextField>
		    		</Collapse>
    			)
    		: sum

    	return sum
    }, []) 

    return (
      <List {...props}>
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
  withGetAllThemes(),
)(Themes)
