import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Field, Form, getFormValues, reduxForm, submit } from 'redux-form'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Fade from 'material-ui/transitions/Fade'
import Button from 'material-ui/Button'
import Text from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
//
// import validate from '../../validation/donationDetails'
import TextField from '../../forms/TextField'
import {ccCheckout} from '../../redux/modules/Checkout/'

// import withSubscriptionToCheckout from '../../hocs/withSubscriptionToCheckout'

const FORM_NAME = 'donate-cc-done'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class FormCCDone extends Component {

  state = {

  }

  componentDidMount = () => {

  }

  dispatchSubmit = () => this.props.submit(FORM_NAME)

  handleSubmit = (values) => {
    console.log('handleSubmit CC Done', values)
  }

  render() {
    const { classes: cls, handleSubmit, isValid, success, checkoutDone } = this.props
    console.log('render FormDone checkoutDone', this.props)
    return (
	    <div className={cls.root}>
        <Form onSubmit={ handleSubmit(this.handleSubmit) } autoComplete="off">
          {checkoutDone === true ? 'success!!!' : 'pending...'}
          <Field name="foo"
            component={TextField}
            helpText="foo is required."
            placeholder="foo" dense={true} required />

          <div className={cls.boxContinue}>
            <Button
              className={classNames(cls.btnContinue, {[cls.valid]: isValid})}
              disabled={!isValid}
              onClick={this.dispatchSubmit}
              color="accent"
              raised>...</Button>

          </div>
        </Form>
      </div>
    )
  }
}

FormCCDone.propTypes = {
  classes: PropTypes.object.isRequired,
}


const mapStateToProps = (state, ownProps) => ({
  success: state.settings && state.settings.checkout && state.settings.checkout.done === true,
})

export default compose(
  withStyles(styles),

  reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: false, destroyOnUnmount: false}),
  connect(mapStateToProps, {submit}),
)(FormCCDone)
