import React from 'react'
import compose from 'recompose/compose'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Typography from 'material-ui/Typography'
import Email from 'material-ui-icons/MailOutline'
import { withStyles } from 'material-ui/styles'
import numeral from 'numeral'
//
import {authSignIn} from '../../../../redux/modules/Auth'
// import { add as addSnackbar } from 'redux/modules/Snackbar'
import Facebook from '../../../../icons/Facebook'
import TextField from '../../../../forms/TextField'
import * as Style from './style'

const FORM_NAME = 'pigpile-express-step1'

const validate = values => {
  const errors = {}
  if (!values.goal) {
    errors.goal = 'A goal amount is required.'
  }
  if (!values.title) {
    errors.title = 'A title for the fundraiser is required.'
  }
  if (!values.organizer) {
    errors.organizer = 'An organizer is required.'
  }
  if (!values.beneficiary) {
    errors.beneficiary = 'A beneficiary for the fundraiser is required.'
  }
  if (!values.location) {
    errors.location = 'A location is required.'
  }
  if (values.authconnected !== 1) {
    errors.authconnected = 'The fundraiser needs to be connected to an account.'
  }
  return errors
}

export class Step1 extends React.Component {

  render() {
    const {auth, classes, handleSubmit = noop => noop, ...actions} = this.props
    console.log('Step1', this.props)

    const authenticated = auth && auth.authenticated && !auth.isAnonymous

    return (
      <form onSubmit={ handleSubmit } autoComplete="off">
        <div className={classNames(classes.title)}>
          <Typography
            style={{marginBottom: 16, fontWeight: 400 }}
            type="title"
            align="left"
            color="inherit"
            >
            Fundraiser Details
          </Typography>
        </div>
        <div className={classNames(classes.container)}>
          <div className={classNames()} style={{marginTop: 24}}>
            <Field
              dollarAdornment={true}
              autoFocus
              name="goal"
              type="text"
              label="Goal"
              format={(value) => {
                console.log('numeral', value)
                return !value ? '' : numeral(value).format('0,0')
              }}
              // parse={(value) => !value ? '' : numeral(value).value()}
              component={TextField}
              helpText="How much do you want to raise?"
              tooltip="Minimum is $500. Currency in USD. You can always increase this later if you need to."
              placeholder="" required />
          </div>
          <div className={classNames()} style={{marginTop: 0}}>
            <Field
              name="title"
              type="text"
              label="Title"
              // parse={(value) => !value ? '' : numeral(value).value()}
              component={TextField}
              helpText="A title should be direct... 'Help Sue Beat Cancer'."
              // tooltip="Minimum is $500. Currency in USD. You can always increase this later if you need to."
              placeholder="Enter a title" required />
          </div>

          <div className={classNames()} style={{marginTop: 0}}>
            <Field
              name="authconnected"
              parse={(value) => typeof value === 'string' ? Number(value) : value}
              normalize={(value) => typeof value === 'string' ? Number(value) : value}
              type="hidden"
              // parse={(value) => parsedValue}
              component={TextField}
              // format={(value) => value === true ? 'true' : 'false'}
              required />
          </div>
          { !authenticated &&
            <div style={{position: 'relative', marginTop: 40,}}>
              <Divider style={{backgroundColor: 'rgba(0,0,0,.12)'}} />
              <Typography className={classNames(classes.orEmail, classes.uppercase)}
                type="body2"
                component="span"
                align="center">
                {!authenticated ? 'Login to Continue' : 'Fundraiser connected to account'}
              </Typography>
            </div>
          }
          { authenticated &&
            <div className={classNames()} style={{marginTop: 0}}>
              <Field
                name="location"
                type="text"
                label="Location"
                // parse={(value) => !value ? '' : numeral(value).value()}
                component={TextField}
                helpText="Where is it?"
                // tooltip="Minimum is $500. Currency in USD. You can always increase this later if you need to."
                placeholder="Enter a location" required />
            </div>
          }
          { authenticated &&
            <div className={classNames()} style={{marginTop: 0}}>
              <Field
                name="organizer"
                type="text"
                label="Organizer"
                // parse={(value) => !value ? '' : numeral(value).value()}
                component={TextField}
                helpText="The organizer is usually you."
                // tooltip="Minimum is $500. Currency in USD. You can always increase this later if you need to."
                placeholder="Organizer" required />
            </div>
          }
          { authenticated &&
            <div className={classNames()} style={{marginTop: 0}}>
              <Field
                name="beneficiary"
                type="text"
                label="Beneficiary"
                // parse={(value) => !value ? '' : numeral(value).value()}
                component={TextField}
                helpText="Who is this for?"
                tooltip="The beneficiary is a person or a phrase such as 'Victims of Hurricane Sandy'."
                placeholder="Beneficiary" required />
            </div>
          }
        </div>



        {
          !authenticated &&
          <div style={{display: 'flex', position: 'relative', top: 6}}>
            <Button className={classNames(classes.full, classes.noShadow, classes.big, classes.fb, {[classes.compact]: true})}
              color="primary"
              style={{marginBottom: 8}}
              component={Link}
              to="/login"
              // disabled={!isSignup && (submitting || pristine)}
              // style={{backgroundColor: '#545454', marginBottom: 12}}
              raised>
              <Facebook className={classes.logoFacebook} /> Facebook
            </Button>
            <div style={{flex: '0 1 16px'}} />
            <Button className={classNames(classes.full, classes.noShadow, classes.big, classes.email, {[classes.compact]: true })}
              color="primary"
              component={Link}
              to="/login"
              raised>
              <Email className={classes.logoEmail} />
              Email
            </Button>
          </div>
        }
        {false && <Divider style={{backgroundColor: 'rgba(0,0,0,.24)', marginTop: 32}} />}
        {
          !authenticated &&
          <div style={{position: 'absolute', bottom: 54, width: 412}}>
            <Typography
              style={{lineHeight: '18px', marginTop: 16, marginBottom: 32, fontSize: 16, color: '#666', fontWeight: 300, paddingRight: 0}}
              type="body2"
              align="center"
            >
              Need a login? Register with Facebook or email.
            </Typography>
          </div>
        }
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  initialValues: {
    authconnected: state.auth.authenticated && !state.auth.isAnonymous ? 1 : 0,
    organizer: state.auth.authenticated && !state.auth.isAnonymous && state.auth.user && state.auth.user.displayName,
    goal: state.form && state.form[FORM_NAME] && state.form[FORM_NAME].values && state.form[FORM_NAME].values.goal,
    title: state.form && state.form[FORM_NAME] && state.form[FORM_NAME].values && state.form[FORM_NAME].values.title,
    location: state.form && state.form[FORM_NAME] && state.form[FORM_NAME].values && state.form[FORM_NAME].values.location,
    beneficiary: state.form && state.form[FORM_NAME] && state.form[FORM_NAME].values && state.form[FORM_NAME].values.beneficiary,
  },
})

export default compose(
  connect(mapStateToProps, {authSignIn}),
  withStyles(Style.Step1),
  // enableReinitialize needed on server
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, validate, enableReinitialize: true, destroyOnUnmount: false}),
)(Step1)
