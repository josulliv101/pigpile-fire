import React, {Component} from 'react'
import Checkbox from 'material-ui/Checkbox'

export default class CheckboxField extends Component {

	componentDidMount = () => { 
		const {autoToggle, input} = this.props
		if (autoToggle) {
			input.onChange(!input.value)
		}
	}
 
  render() {
  	const {autoToggle = false, classes, input, label} = this.props
	  return (
	    <Checkbox
	      classes={classes}
	      label={label}
	      checked={input.value ? true : false}
	      onChange={input.onChange}
	    />
	  )  	
	}
}
