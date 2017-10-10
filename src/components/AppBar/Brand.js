import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import Button from '../Button'

const styles = (theme, {common: {white}} = theme.palette) => ({
  root: {
    align: 'center',
    color: white,
    display: 'flex',
  },
  brand: {
    ...theme.components.brand,
    fontSize: 24,
    fontWeight: 300,
  },
  tagline: {
    fontSize: 18,
    fontWeight: 400,
    textTransform: 'lowercase',
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function Brand(props) {
  const {className, classes: cls} = props
  return (
    <div className={classNames(cls.root, className)}>
      <Button className={classNames(cls.brand)} dense to="/" >
        pigpile
      </Button>
      <Button to="/" className={classNames(cls.tagline)} dense to="/" >
        / free online fundraising
      </Button>
    </div>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Brand)
