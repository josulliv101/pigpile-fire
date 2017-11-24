import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import classNames from 'classnames'
import {Redirect} from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { withStyles } from 'material-ui/styles'
//
import {create} from '../../../../redux/modules/Pile/'
import TextField from '../../../../forms/TextField'
import ImageUploadField from '../../../../forms/ImageUploadField'
import * as Style from './style'

const FORM_NAME = 'pigpile-express-step3'

const validate = values => {
  const errors = {}
  if (!values.fileUpload) {
    errors.fileUpload = 'An image is required.'
  }
  return errors
}

const FILE_FIELD_NAME = 'fileUpload'

export class Step3 extends React.Component {

  handleCreatePile = () => this.props.create()

  render() {
    const {auth, classes, handleSubmit = noop => noop, stepValid, step1Valid, step2Valid} = this.props

    if (step1Valid !== true) {
      return <Redirect to="/express/create" />
    }

    if (step2Valid !== true) {
      return <Redirect to="/express/create/2" />
    }

    if (!auth || auth.isAnonymous || auth.authenticated !== true) {
      return <Redirect to="/express/create" />
    }

    return (
      <form className={classNames(classes.form)} onSubmit={ handleSubmit } autoComplete="off">
        <div className={classNames(classes.title)}>
          <Typography
            style={{marginBottom: 16, fontWeight: 400}}
            type="title"
            align="left"
            color="inherit"
            gutterBottom>
            Image Upload
          </Typography>
        </div>
        <div style={{minHeight: 100, marginBottom: 4, background: '#fff', border: '1px #eee solid', padding: 16}}>
          <label style={{display: 'none'}} htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={ImageUploadField}
          />
        </div>
        <div>
          <Typography align="left" type="body2" style={{fontWeight: 300, marginTop: 8}}>
            An image is required.
          </Typography>
          <Divider style={{marginTop: 24}}/>
          <Typography type="subheading" style={{fontWeight: 300, marginTop: 24}}>
            Once your fundraiser is created, you can add tags, switch themes, include an image gallery, enable t-shirt give away, and more.
          </Typography>
          <div style={{marginTop: 24, display:'flex', justifyContent: 'center'}}>
            <Button
              color="primary"
              disabled={!stepValid}
              onClick={this.handleCreatePile}
              raised>
              Create Fundraiser
              </Button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default compose(
  connect(mapStateToProps, {create}),
  withStyles(Style.Step3),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, validate, destroyOnUnmount: false}),
)(Step3)
