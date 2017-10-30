import React, {Component} from 'react'
import { findDOMNode } from 'react-dom';
import Checkbox from 'material-ui/Checkbox'

export default class CheckboxField extends Component {

	componentDidMount = () => { 
		const {autoToggle, input} = this.props
		console.log('CheckboxField componentDidMount', input)
		if (autoToggle) {
			input.onChange(!input.value)
		}
		// if (autoToggle === true) {
		// 	input.onChange(null, !input.value)
		// }
		// findDOMNode(this.el).click()

	}
 
  render() {
  	const {autoToggle = false, classes, input, label} = this.props
	  return (
	    <Checkbox
	      classes={classes}
	      label={label}
	      checked={input.value ? true : false}
	      onChange={input.onChange}
	      // ref={node => this.el = node}
	    />
	  )  	
	}
}
