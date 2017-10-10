import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'
//
import Pigtail from '../../icons/Pigtail'

const size = 36

const styles = (theme, {common: {white}, primary} = theme.palette) => ({
  root: {
    color: white,
    height: size * 1.5,
    marginLeft: -size * 1.5/2,
    position: 'relative',
    width: size * 1.5,
    '&$rippleFix>span:last-child': {
      transform: 'scale(1.2, 1.2)',
    },
  },
  back: {
    background: primary[500],
    border: `${white} 2px solid`,
    borderRadius: 36,
    height: size,
    left: `calc(50% - ${size/2}px)`,
    position: 'absolute',
    top: `calc(50% - ${size/2}px)`,
    transform: 'scale(1, 1)',
    width: size,
    zIndex: 1,
  },
  icon: {
    height: size,
    position: 'relative',
    width: size,
    zIndex: 2,
  },
  rippleFix: {},
})

function Logo(props) {
  const {className, classes: cls, shrink} = props
  return (
    <IconButton
      className={classNames(cls.root, {[cls.rippleFix]: shrink}, className)}
      component={Link}
      to="/"
    >
      <Pigtail className={cls.icon} />
      <div className={cls.back} />
    </IconButton>
  )
}

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Logo)
