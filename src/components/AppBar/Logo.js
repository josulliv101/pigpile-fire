import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import { CircularProgress } from 'material-ui/Progress';
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
  loading: {
  	'& $back': {
  		background: white,
  	},
  },
  progress: {
    color: primary[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 26,
    marginTop: -13,
    marginLeft: -13,
    width: 26,
    zIndex: 5,
  },
  rippleFix: {},
})

function Logo(props) {
  const {className, classes: cls, loading = false, shrink} = props
  return (
    <IconButton
      className={classNames(cls.root, {[cls.rippleFix]: shrink}, {[cls.loading]: loading},className)}
      component={Link}
      to="/"
    >
      {!loading && <Pigtail className={cls.icon} />}
      <div className={cls.back}>
      	{loading && <CircularProgress className={cls.progress} size={26} thickness={8} />}
      </div>
    </IconButton>
  )
}

Logo.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Logo)
