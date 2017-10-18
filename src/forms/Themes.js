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

class ThemeField extends Component {

  handleChange = (id) => {
    const {input} = this.props
    console.log(id)
    input.onChange(id);

    // Make available to all cmps that need to know
    this.props.setting('themePreview', id)
  }

  render() {
    const {input, setting, themes = [], ...props} = this.props
    console.log('ThemeField', themes, props, input)
    return (
      <List {...props}>
        {
          Object.keys(themes).map(key => (
            <ListItem button divider key={key} onClick={this.handleChange.bind(this, key)}>
              <ListItemText primary={themes[key].label} />
              {
                input.value === key && 
                <ListItemIcon>
                  <Check style={{marginRight: 0}} />
                </ListItemIcon>
              }
            </ListItem>
          ))        
        }
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
