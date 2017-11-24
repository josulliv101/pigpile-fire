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

const FORM_NAME = 'donate-show-support'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  row: {
    display: 'flex',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class FormShowSupport extends Component {

  state = {

  }

  componentDidMount = () => {

  }

  dispatchSubmit = () => this.props.submit(FORM_NAME)

  handleSubmit = (values) => {
    console.log('handleSubmit CC', values)
    const {amount = 5, confirmedCheckout, isValid, nextStep, pid} = this.props
    if (amount && pid && isValid) {
      // confirmedCheckout(pid, amount)
      nextStep()
    }
  }

  render() {
    const { classes: cls, handleSubmit, isValid } = this.props
    return (
	    <div className={cls.root}>
        <Form onSubmit={ handleSubmit(this.handleSubmit) } autoComplete="off">
          <Text className={cls.private}type="subheading" color="inherit">
            Let'em know you were here! Choose one below or upload your own.
          </Text>

            <Field name="note"
              component={TextField}
              helpText="Add a note"
              placeholder="Leave a supportive note" dense={true} required
            />

          <div className={cls.boxContinue}>
            <Button
              className={classNames(cls.btnContinue, {[cls.valid]: isValid})}
              disabled={!isValid}
              onClick={this.dispatchSubmit}
              color="accent"
              raised>Next</Button>
            <Text className={cls.terms} type="body1" align="center" color="inherit">
              By continuing, you agree with the Pigpile terms, and privacy policy.
            </Text>
          </div>
        </Form>
      </div>
    )
  }
}

FormShowSupport.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps, values = getFormValues(FORM_NAME)(state)) => ({
  // initialValues: {client_id: 128805},
  isValid: state.form && state.form[FORM_NAME] && !state.form[FORM_NAME].syncErrors,
  ...values,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {ccCheckout, submit}),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: false, destroyOnUnmount: false}),
)(FormShowSupport)
