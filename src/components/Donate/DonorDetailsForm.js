import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Field, getFormValues, reduxForm } from 'redux-form'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Text from 'material-ui/Typography'
//
import validate from '../../validation/donationDetails'
import TextField from './TextField'
// import creditcards from './creditcards.png'

const FORM_NAME = 'donor-details'

const styles = (theme) => ({
  root: {
    background: theme.palette.background.default,
    height: '100%',
    left: 0, // '100%',
    opacity: 0,
    padding: theme.spacing.unit * 2,
    position: 'absolute',
    top: 0,
    transition: theme.transitions.create(['opacity']),
    width: '100%',
    zIndex: 9,
    '&$active': {
      left: 0,
      opacity: 1,
      zIndex: 11,
    },
  },
  active: {},
  back:{
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  boxContinue: {
    marginTop: theme.spacing.unit * 7,
  },
  btnContinue: {
    display: 'block',
    margin: '0 auto',
    opacity: .4,
    transition: theme.transitions.create(['opacity']),
    '&$valid': {
      opacity: 1,
    },
  },
  private: {
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 1,
  },
  terms: {
    display: 'block',
    fontWeight: 300,
    margin: `${theme.spacing.unit * 2}px auto`,
    width: '74%',
  },
  valid: {},
  [theme.breakpoints.up(948)]: {

  },
})

class DonorDetails extends PureComponent {

  render() {
    const { amount: amountProp, classes: cls, handleSubmit, isValid, pid, showDetails } = this.props

    // An amount is always needed.
    if (showDetails && !amountProp) return <Redirect to={{pathname:`/pile-${pid}`, state: null}} />

    return (
      <div className={classNames(cls.root, {[cls.active]: showDetails})}>
        <form onSubmit={ handleSubmit } autoComplete="off">
          <Text className={cls.private} type="subheading" color="inherit">
            We won't share your email.
          </Text>
          <Field name="fname"
            component={TextField}
            helpText="First name is required."
            placeholder="First Name" dense={true} required />
          <Field name="lname"
            component={TextField}
            helpText="Last name is required."
            // helpText="We don't share your email with anyone."
            placeholder="Last Name" dense={true} required />
          <Field name="email"
            component={TextField}
            helpText="Email is required."
            placeholder="Email" required
          />
          <div className={cls.boxContinue}>
            <Button className={classNames(cls.btnContinue, {[cls.valid]: isValid})} disabled={!isValid} color="accent" raised>Continue</Button>
            <Text className={cls.terms} type="body1" align="center" color="inherit">
              By continuing, you agree with the Pigpile terms, and privacy policy.
            </Text>
          </div>
        </form>
      </div>
    )
  }
}

DonorDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps, values = getFormValues(FORM_NAME)(state)) => ({
  initialValues: {
    ...values,
  },
  isValid: state.form && state.form[FORM_NAME] && !state.form[FORM_NAME].syncErrors,
  ...values,
  ...getFormValues('donate-how-much')(state),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, validate, enableReinitialize: false, destroyOnUnmount: false}),
)(DonorDetails)
