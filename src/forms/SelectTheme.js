import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Field} from 'redux-form'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import Collapse from 'material-ui/transitions/Collapse'
import {withStyles} from 'material-ui/styles'
import Check from 'material-ui-icons/Check';
import InputField from './InputField'
import RadioOn from 'material-ui-icons/RadioButtonChecked';
import RadioOff from 'material-ui-icons/RadioButtonUnchecked';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
//
import {preview, unsetPreview} from '../redux/modules/Theme'

const TextEditor = (props) => <Field {...props} component={InputField} fullWidth />

const styles = (theme) => ({
  root: {
  	backgroundColor: 'rgba(0,0,0,.04)',
  },
  iconItem: {
  	marginRight: 0,
  },
  radioItem: {
  	height: 20,
		width: 20, 
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

const themeConfigOptions = {
	titleStyle: {
		items: [
			'light', 
			'light on bg',
			'dark', 
			'dark on bg',
		],
		menuItemPrefix: 'Title style',
	},
	titlePosition: {
		items: [
			'top', 
			'bottom', 
		],
		menuItemPrefix: 'Title position',
	},
	sidebarType: {
		items: [
			'default', 
			'bottom', 
			'bottom-small'
		],
		menuItemPrefix: 'Sidebar',
	}
}


class ThemeFields extends Component {

  render() {
    return [
      <Field 
        key="themeId"
      	name="theme.id" 
      	component={SelectTheme} 
      	type="hidden"
      	{...this.props}
      />,
    ]
  }

}

class SelectTheme extends Component {

	// The selected value will be on the input.value property.
	state = {
		container: null,
	}

  handleThemeChange = (item) => {
    console.log('handleThemeChange', item)
    const {input, preview, themes} = this.props

  	// If item at root, there's no container
  	if (item.tags && item.tags.root) {
  		this.setState({container: null})
  	}

  	input.onChange(item.id)
  	preview(item.id)
  }

  handleContainerChange = (item) => {
    console.log('handleContainerChange', item)
    const {input, preview, themes} = this.props

    // True containers have toggle ability. Pseudo-themes act like radios
    if (item.pseudoTheme !== true) {
    	this.setState({container: this.state.container === item.id ? null : item.id})
    }

    // Some are pseudo-themes. They appear like a theme with different flavors
    // but it's just a wrapper for other themes, not a theme in itself.
    if (item.pseudoTheme === true) {
    	// const id = item.id && item.id.split('-')[0]
    	// First get all real themes with this tag id
    	// const childThemes = this.getThemesWithTag(id)
    	// console.log('childThemes', childThemes)

    	this.setState({container: item.id})
    	// If none are active, select the first one
    	// const anyActive = childThemes.some(th => th.id === input.value)
    	if (!this.hasActiveChild(item.id)) {
    		const defaultTheme = this.getDefaultThemeForTag(item.id)
    		input.onChange(defaultTheme && defaultTheme.id)
    		preview(defaultTheme && defaultTheme.id)
    	}
    }
  }

  componentDidMount = () => {
  	const {input: {name} = {}} = this.props
  	// Give the editor a chance to affect persisting data by giving
  	// ability to set state on parent. For example, this good be a good
  	// place to have a prop that managed whether a persist was a 'merge' or 'replace'
  	console.log('Editor componentDidMount', this.props)
  	if (this.props.setParentState) {
  		this.props.setParentState({merge: this.props.merge})
  	}
  }

  componentWillUnmount = () => {
  	console.log('Editor componentWillUnmount', this.props)
  	if (this.props.setParentState) {
  		this.props.setParentState({merge: null})
  	}
  	this.props.unsetPreview()
  }

  hasActiveChild = (themeId) => {
  	const {input} = this.props
  	const childThemes = this.getThemesWithTag(themeId)
  	return childThemes.some(th => input && th.id === input.value)
  }

  getDefaultThemeForTag = (themeId) => {
  	const childThemes = this.getThemesWithTag(themeId)
  	return childThemes.length && childThemes[0]
  }

  getItemCmp = (item) => item.theme ? ThemeItem : (item.pseudoTheme ? PseudoThemeItem : ContainerItem)

  getThemesWithTag = tagId => this.props.items.filter(item => item.tags && item.tags[this.normalizeId(tagId)] === true)

  // Tags may also have corresponding order number... baseTag is 'foo' and item also has 'foo-1' (first one)
  orderByTag = (items, tagBase) => items.sort(function (a, b) {
	  // return a.tags && a.tags[`${tagBase}-`] localeCompare(b);
	})

  normalizeId = (id) => typeof id === 'string' && id.replace('-container', '')

  renderConfig = (config) => {
  	const {themeConfig} = this.props
  	const items = Object.keys(config)
  	return items.map((key, index) => {
  		// The definition
  		const def = themeConfig[key]
  		if (!def) return null
  		return (
  			<div key={key} style={{height: 48, paddingTop: index === 0 ? 16 : 0, display: 'flex', alignItems: 'center'}}>
  				<label style={{lineHeight: '48px', backgroundColor: 'rgba(0,0,0,.04)', textAlign: 'right', flex: '1 0 40%', paddingRight: 16, marginRight: 16, marginBottom: 16}}>{def.menuItemPrefix}</label>
		  		<TextEditor 
		  			select={true} 
		  			key={key} 
		  			margin="none" 
	          SelectProps={{
	          	// MenuProps: {
					    //   anchorOrigin: {vertical: 'center', horizontal: 'center'},
					    //  transformOrigin: {vertical: 'center', horizontal: 'right'},
	          	// },
	            renderValue: value => {
	            	const item = def.items.find(itm => itm.id === value)
	            	return item && item.nameAbbr || item.name
	            }
	          }}
		  			name={`theme.config.${key}`}>
		        {def.items.map((item) => (
		          <MenuItem key={item.id} value={item.id}>
		            {item.name}
		          </MenuItem>
		        ))}
		  		</TextEditor>
		  	</div>
  		)
  	})
  }

  renderItem = (item) => {
  	const {classes, input} = this.props
  	const Cmp = this.getItemCmp(item)
  	const isRoot = item.tags && item.tags.root
  	const active = item.id === input.value || item.id === this.state.container || this.hasActiveChild(item.id)
  	const handler = item.theme ? this.handleThemeChange.bind(this, item) : this.handleContainerChange.bind(this, item)
  	const children = this.getThemesWithTag(item.id).map(childItem => this.renderItem(childItem))
  	const childrenWithConfig = children.concat(item.config ? this.renderConfig(item.config) : [])
  	return [
  		<Cmp key={item.id} {...item} active={active} cls={classes} dense={!isRoot} onClick={handler} />,
  		childrenWithConfig.length ? <Collapse key={`collapse-${item.id}`} in={active} transitionDuration="auto" >{childrenWithConfig}</Collapse>: null
  	]
  }

  render(list) {
    const {classes, input, items = [], merge, preview, unsetPreview, setParentState, themeConfig, ...props} = this.props
    console.log('SelectTheme', items, props, input)
    return (
      <List {...props}>
        {
          (list || this.getThemesWithTag('root')).map(item => this.renderItem(item))
        }
      </List>
    )
  }
}

function ThemeItem({cls, ...props}) {
	return(
	  <ListItem button dense={props.dense} divider key={`theme-${props.id}`} onClick={props.onClick}>
      {	
      	// Only real themes can have a swatch color
      	props.swatch && <Button raised style={{minWidth: 24, minHeight: 24, padding: 0,background: props.swatch, marginRight: 0, height: 24, width: 24, border: '2px #fff solid'}}> </Button>
      }
	    <ListItemText primary={props.name} />
	    {
	    	props.active === true && props.tags && props.tags.root && 
	      <ListItemIcon>
	        <Check className={classNames(cls.iconItem)} />
	      </ListItemIcon>
	    }
	    {
	    	props.swatch && 
	      <ListItemIcon>
	        {props.active ? <RadioOn className={classNames(cls.iconItem, cls.radioItem)} /> : <RadioOff className={classNames(cls.iconItem, cls.radioItem)} />}
	      </ListItemIcon>
	    }
	  </ListItem>
	)
}

function PseudoThemeItem({cls, ...props}) {
	return(
	  <ListItem button divider key={`pseudo-${props.id}`} onClick={props.onClick}>
	    <ListItemText primary={props.name} />
	    {
	    	props.active === true && 
	      <ListItemIcon>
	        <Check className={classNames(cls.iconItem)} />
	      </ListItemIcon>
	    }
	  </ListItem>
	)
}

function ContainerItem({cls, ...props}) {
	return(
	  <ListItem button divider key={props.id} onClick={props.onClick}>
	    <ListItemText primary={props.name} />
	    {
	      <ListItemIcon>
	        {props.active === true ? <ExpandLess className={classNames(cls.iconItem)} /> : <ExpandMore className={classNames(cls.iconItem)} />}
	      </ListItemIcon>
	    }
	  </ListItem>
	)
}

SelectTheme.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  merge: PropTypes.bool,
}

SelectTheme.defaultProps = {
	merge: false,
}

export default compose(
  withStyles(styles),
  connect(null, {preview, unsetPreview}),
)(ThemeFields)
