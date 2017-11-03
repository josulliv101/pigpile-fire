import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import {Headline} from '../../Text'

const styles = (theme, {unit} = theme.spacing, {transparent, white} = theme.palette.common) => ({
  root: {
    background: transparent,
    color: white,
    display: 'inline-block', // If bg present, only go as wide as text length, not full width.
    fontSize: 26,
    lineHeight: '36px',
    marginBottom: unit * 1.5,
    padding: 0,
  },  
})

function Title(props) {
  const {children, classes: cls, className} = props
  return (
    <Headline 
    	className={classNames(
		  	cls.root, 
		  	className,
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
