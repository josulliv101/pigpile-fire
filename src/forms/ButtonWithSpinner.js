import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import {withStyles} from 'material-ui/styles'
//


const styles = (theme) => ({
  '@keyframes blink': {
    '0%': {opacity: .2},
    '20%': {opacity: 1},
    '100%': {opacity: .2},
  },
  dots: {
    fontSize: 36,
    '&>span': {
      animationName: 'blink',
      animationDuration: '1.0s',
      animationIterationCount: 'infinite',
      animationFillMode: 'both',
      display: 'inline-block',
      position: 'relative',
      top: '-.25em',
    },
    '&>span:nth-child(2)': {
      animationDelay: '.2s',
    },
    '&>span:nth-child(3)': {
      animationDelay: '.4s',
    },
  },
  progress: {
    color: theme.palette.common.white,
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 20,
    marginTop: -10,
    marginLeft: -10,
    width: 20,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

const Dots = (props) => (
  <div {...props}>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
)
class ButtonWithSpinner extends Component {

  render() {
    const {children, classes: cls, className, spinning = false, ...props} = this.props
    return (
      <div className={cls.wrapper}>
	      <Button className={classNames(className)} {...props}> 
	        {!spinning && children}
	      </Button>
        {spinning && <CircularProgress className={cls.progress} size={20} />}
      </div>
    )
  }
}

ButtonWithSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(ButtonWithSpinner)
