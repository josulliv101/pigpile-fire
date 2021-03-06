import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import Button from '../Button'

const styles = (theme) => ({
  root: {
    ...theme.components.brand,
    fontSize: 24,
    fontWeight: 300,
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function Brand(props) {
  const {classes: cls, className} = props
  return (
    <Button className={classNames(cls.root, className)} dense to="/" >
      pigpile
    </Button>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Brand)
