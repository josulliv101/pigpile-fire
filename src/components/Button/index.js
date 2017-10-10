import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import MuiButton from 'material-ui/Button'

export default function Button({children, ...rest}) {
  return (
    <MuiButton color="inherit" component={Link} {...rest}>
      {children}
    </MuiButton>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}
