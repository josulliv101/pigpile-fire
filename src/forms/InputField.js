import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles'
//


const styles = (theme) => ({
  root: {

  },

  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class InputField extends PureComponent {

  render() {
    const {children, className, input, handleKeyPress = f=>f, meta: {error, touched, warning}, setParentState, ...custom} = this.props
    return (
      <TextField
        id={custom.name}
        className={className}
        // helperText="Full width!"
        
        {...input}
        // onKeyPress={handleKeyPress}
        {...custom}
      >
        {children}
      </TextField>
    )
  }
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(InputField)
