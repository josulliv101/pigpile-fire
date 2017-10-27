import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {ListSubheader} from 'material-ui/List'
import {withStyles} from 'material-ui/styles'
//

const styles = (theme) => ({
  root: {
  	borderBottom: '1px solid rgba(0, 0, 0, 0.075)',
  },
})

class SectionTitle extends Component {

	render() {
	  const {children, classes: cls, className, label} = this.props
	  return (
	    <ListSubheader className={classNames(cls.root, className)} disableSticky>
	    	{children || label}
	    </ListSubheader>
	  )		
	}
}

SectionTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(SectionTitle)
