import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import Button from '../Button'

const styles = (theme) => ({
  root: {
    fontSize: 18,
    fontWeight: 400,
    textTransform: 'lowercase',
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function Tagline(props) {
  const {classes: cls, className} = props
  return (
    <Button to="/" className={classNames(cls.root, className)} dense to="/" >
      / free online fundraising
    </Button>
  )
}

Tagline.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Tagline)
