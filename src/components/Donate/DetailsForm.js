import React, {Component} from 'react'
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
import { CircularProgress } from 'material-ui/Progress'
//
// import validate from '../../validation/donationDetails'
import TextField from '../../forms/TextField'
import {completeCheckout, setIframe, iframeLoaded} from '../../redux/modules/Checkout/'

import withSubscriptionToCheckout from '../../hocs/withSubscriptionToCheckout'

const FORM_NAME = 'donor-details'

const styles = (theme) => ({
  root: {
    // background: theme.palette.background.default,
    height: '100%',
    left: 0, // '100%',
    // opacity: 0,
    padding: 0, // theme.spacing.unit * 2,
    position: 'relative',
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
  checkoutContainer: {
    opacity: 0,
    transition: theme.transitions.create(['opacity']),
    transitionDuration: '1s',
    '&$loaded': {
      opacity: 1,
    },
    '&>#wepay_checkout_iframe': {
      height: 360,
      width: 600,
    },
  },
  loaded: {},
  progress: {
    position: 'absolute',
    left: 'calc(50% - 50px)',
    top: 'calc(30% - 50px)',
    zIndex: 6,
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
    root: {
      width: 600,
    },
  },
})

class DonorDetails extends Component {

  state = {
    complete: false,
  }

  msgHandler = (e, arg) => {
    //console.log('msgHandler', e, this.props)
    const {pid} = this.props
    if (e.origin !== 'https://stage.wepay.com')
      return

    if (e.data && typeof e.data === 'string') {
      const data = WePay.JSON.parse(e.data)
      if (data.wepay_message_type === 'iframe_checkout_complete' && data.checkout_id) {
        console.log('msgHandler data', data, this.props)
        this.props.completeCheckout(pid, data.checkout_id)
        // this.setState({complete: true})

      }

    }
  }

  shouldComponentUpdate = (nextProps) => {
    if (
      (nextProps.url && nextProps.url !== this.props.url) ||
      (nextProps.iframeCalledback === true && !this.props.iframeCalledback) ||
      (nextProps.checkoutSuccess === true && !this.props.checkoutSuccess)
    )
      return true
    return false
  }

  componentDidMount = () => {
    const {iframeLoaded, iframeCalledback = false} = this.props
    window && window.addEventListener('message', this.msgHandler);
    WePay.listen("iframe_window_title", (arg) => {
      console.log("cb iframe_window_title", iframeCalledback)
      if (!iframeCalledback) iframeLoaded(true)
    })
  }

  componentDidUpdate = (prevProps) => {
    const {url} = this.props
    console.log('DonorDetails::componentDidUpdate', WePay, url, prevProps.url)
    if (!WePay || !url || prevProps.url === url) return

    WePay.iframe_checkout("wepay_checkout", url);
  }

  componentWillUnmount = () => {
    this.props.setIframe(null)
    this.props.iframeLoaded(false)
  }
  render() {
    const { amount: amountProp, checkoutSuccess = false, classes: cls, handleSubmit, iframeCalledback = false, isValid, pid, showDetails, url } = this.props

    // An amount is always needed.
    // if (showDetails && !amountProp) return <Redirect to={{pathname:`/pile-${pid}`, state: null}} />
    console.log('DonorDetails::render', url, iframeCalledback, checkoutSuccess)
    return (
	    <div className={cls.root}>
        {!iframeCalledback && <CircularProgress mode="indeterminate" className={cls.progress} size={100} thickness={4} />}
        <div key="wepay_checkout" id="wepay_checkout" className={classNames(cls.checkoutContainer, {[cls.loaded]: iframeCalledback})} style={{position: 'relative', zIndex: 4, width: '100%', height: '100%'}} />
        {checkoutSuccess ? 'checkout Success!!!' : 'in process'}
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
  checkoutSuccess: state.settings && state.settings.checkout && state.settings.checkout.done === true,
  url: state.checkout && state.checkout.iframe,
  iframeCalledback: state.checkout && state.checkout.loaded === true,
  // url: state.settings && state.settings.checkout && state.settings.checkout.checkout_uri,
  isValid: state.form && state.form[FORM_NAME] && !state.form[FORM_NAME].syncErrors,
  ...values,
  ...getFormValues('donate-how-much')(state),
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {completeCheckout, iframeLoaded, setIframe}),
  // reduxForm({form: FORM_NAME, onSubmit: noop => noop, enableReinitialize: false, destroyOnUnmount: false}),
  withSubscriptionToCheckout(),
)(DonorDetails)
