import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'
import Person from 'material-ui-icons/Person'
//

const styles = (theme) => ({
  root: {
    color: '#fff',
    // position: 'fixed',
    // right: theme.spacing.unit * 1,
    // top: theme.spacing.unit * .5,
    zIndex: theme.zIndex.appBar + 2,
    '&$rippleFix>span:last-child': {
      transform: 'scale(1.2, 1.2)',
    }
  },
  icon: {},
  rippleFix: {},
})

function LoginButton(props) {
  const {className, classes: cls, shrink} = props
  return (
    <IconButton
      className={classNames(cls.root, {[cls.rippleFix]: shrink}, className)}
      component={Link}
      to="/login"
    >
      <Person className={cls.icon} />
    </IconButton>
  )
}

LoginButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(LoginButton)
