import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//
import Pigtail from '../../icons/Pigtail'

const styles = (theme) => ({
  root: {
    ...theme.components.brand,
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 24,
    fontWeight: 300,
    opacity: .3,
    position: 'relative',
    top: -3,
    '&>*:first-child': {
      marginRight: theme.spacing.unit * 1,
    },
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
      <Pigtail />
      pigpile
    </div>
  )
}

Brand.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Brand)
