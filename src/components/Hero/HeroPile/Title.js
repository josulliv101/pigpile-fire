import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import {Headline} from '../../Text'

const styles = (theme, {unit} = theme.spacing, {darkBlack, lightBlack, lightWhite, transparent, white} = theme.palette.common) => ({
  root: {
    background: transparent,
    color: white,
    display: 'inline-block', // If bg present, only go as wide as text length, not full width.
    fontSize: 24,
    lineHeight: '36px',
    marginBottom: -unit,
    padding: 0,
  },

  // Light text, no bg
  textStyle1: {
  	// the default
  }, 

  // Light text on dark bg
  textStyle2: {
  	background: lightBlack,
  	padding: `0 ${unit}px`,
  },

  // Dark text, no bg
  textStyle3: {
		color: lightBlack,
  },

  // Dark text on light bg
  textStyle4: {
  	background: lightWhite,
	color: lightBlack,
	padding: `0 ${unit}px`,
  },
  
})

function Title(props) {
  const {children, classes: cls, className} = props
  return (
    <Headline 
    	className={classNames(
		  	cls.root, 
		  	// Layout data will have a text style property such as `{'textStyle-4': true}`
		  	...[1,2,3,4].map(n => ({[cls[`textStyle${n}`]]: props[`textStyle-${n}`]})),
		  	className
		  )}
		  heavy
    	noWrap>
      {children}
    </Headline>
  )
}

Title.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Title)
