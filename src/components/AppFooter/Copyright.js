import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui-icons/Copyright'
//
import {Body2} from '../Text'

const styles = (theme) => ({
  root: {
    marginLeft: 46,
    opacity: .7,
    '& svg': {
      height: 18,
      marginRight: theme.spacing.unit * 1/2,
      marginLeft: theme.spacing.unit * 2,
      opacity: .8,
      position: 'relative',
      top: 3,
      width: 18,
    },
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function Copyright(props) {
  const {className, classes: cls} = props
  return (
    <Body2 align="right" className={cls.root}>
      <Icon />2017 Pigpile Corporation. All Rights Reserved.
    </Body2>
  )
}

Copyright.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Copyright)
