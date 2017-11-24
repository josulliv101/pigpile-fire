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

const FORM_NAME = 'donate-cc'

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

class FormCC extends Component {

  state = {

  }

  componentDidMount = () => {
        WePay.set_endpoint("stage"); // change to "production" when live
  }

  dispatchSubmit = () => this.props.submit(FORM_NAME)

  handleSubmit = (values) => {
    console.log('handleSubmit CC', values)

    WePay.credit_card.create(values, (data = {}) => {
        if (data.error) {
          console.log(data);
          // handle error response
        } else {
          // call your own app's API to save the token inside the data;
          // show a success page
          console.log('data wepay', data)
          if (data.credit_card_id) {
            this.props.ccCheckout(this.props.pid, data.credit_card_id)
            this.props.nextStep && this.props.nextStep()
          }
        }
    });



  }

  render() {
    const { classes: cls, handleSubmit, isValid } = this.props
    return (
	    <div className={cls.root}>
        <Form onSubmit={ handleSubmit(this.handleSubmit) } autoComplete="off">
          <Text className={cls.private}type="subheading" color="inherit">
            We won't share your email.
          </Text>
          <Field name="client_id"
            type="hidden"
            component={TextField}
            helpText="client_id is required."
            placeholder="client_id" dense={true} required />
          <Field name="user_name"
            component={TextField}
            helpText="User name is required."
            placeholder="User Name" dense={true} required />
          <Field name="email"
            component={TextField}
            helpText="Email is required."
            placeholder="Email" required
          />
          <Field name="address.postal_code"
            component={TextField}
            helpText="Zipcode is required."
            placeholder="Zip" dense={true} required
          />
          <div className={cls.row}>
            <Field name="cc_number"
              component={TextField}
              helpText="cc_number is required."
              placeholder="cc_number" dense={true} required
            />

            <Field name="cvv"
              component={TextField}
              helpText="cvv is required."
              placeholder="cvv" dense={true} required
            />
          </div>

          <div className={cls.row}>
            <Field name="expiration_month"
              component={TextField}
              helpText="expiration_month is required."
              placeholder="expiration_month" dense={true} required
            />

            <Field name="expiration_year"
              component={TextField}
              helpText="expiration_year is required."
              placeholder="expiration_year" dense={true} required
            />
          </div>


          <div className={cls.boxContinue}>
            <Button
              className={classNames(cls.btnContinue, {[cls.valid]: isValid})}
              disabled={!isValid}
              onClick={this.dispatchSubmit}
              color="accent"
              raised>Continue</Button>
            <Text className={cls.terms} type="body1" align="center" color="inherit">
              By continuing, you agree with the Pigpile terms, and privacy policy.
            </Text>
          </div>
        </Form>
      </div>
    )
  }
}

FormCC.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps, values = getFormValues(FORM_NAME)(state)) => ({
  initialValues: {client_id: 128805},
  isValid: state.form && state.form[FORM_NAME] && !state.form[FORM_NAME].syncErrors,
  ...values,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {ccCheckout, submit}),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: false, destroyOnUnmount: false}),
)(FormCC)
