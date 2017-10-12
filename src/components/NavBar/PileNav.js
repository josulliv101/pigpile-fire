import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import Button from '../Button'

const styles = (theme, {common: {white}} = theme.palette) => ({
  root: {

  },

  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function PileNav(props) {
  const {className, classes: cls} = props
  return (
    <div className={classNames(cls.root, className)}>
      <Button to="/" >
        pigpile
      </Button>
      <Button to="/" to="/" >
        pile
      </Button>
    </div>
  )
}

PileNav.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(PileNav)
