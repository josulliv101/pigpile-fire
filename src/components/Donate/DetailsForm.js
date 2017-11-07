import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Field, getFormValues, reduxForm } from 'redux-form'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Fade from 'material-ui/transitions/Fade'
import Button from 'material-ui/Button'
import Text from 'material-ui/Typography'
//
// import validate from '../../validation/donationDetails'
import TextField from '../../forms/TextField'
// import creditcards from './creditcards.png'
import withSubscriptionToCheckout from '../../hocs/withSubscriptionToCheckout'

const FORM_NAME = 'donor-details'

const styles = (theme) => ({
  root: {
    background: theme.palette.background.default,
    height: '100%',
    left: 0, // '100%',
    // opacity: 0,
    padding: theme.spacing.unit * 2,
    // position: 'absolute',
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

  componentDidMount = () => {
    const {url} = this.props
    if (!WePay || !url) return
    WePay.iframe_checkout("wepay_checkout", url);
  }

  render() {
    const { amount: amountProp, classes: cls, handleSubmit, isValid, pid, showDetails } = this.props

    // An amount is always needed.
    if (showDetails && !amountProp) return <Redirect to={{pathname:`/pile-${pid}`, state: null}} />

    return (
	    <div className={cls.root}>
        <div id="wepay_checkout" style={{width: '100%', height: '100%'}} />
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
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: false, destroyOnUnmount: false}),
  withSubscriptionToCheckout(),
)(DonorDetails)
