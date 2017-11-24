import React from 'react'
import compose from 'recompose/compose'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import {Redirect} from 'react-router-dom'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
//
import TextField from '../../../../forms/TextField'
import DraftJsEditor from '../../../../forms/Editor'
import ImageUploadField from '../../../../forms/ImageUploadField'
import * as Style from './style'


const ContentEditor = (props) => <Field {...props} component={DraftJsEditor} />

const FORM_NAME = 'pigpile-express-step2'
const OVERVIEW_LIMIT = 500

const validate = values => {
  const errors = {}
  console.log('validate #2', values)
  if (!values.count || values.count > OVERVIEW_LIMIT) {
    errors.count = 'An count is invalid.'
  }
  return errors
}



export class Step2 extends React.Component {

  componentWillUnmount = () => this.props.setFrameState({extraWide: false})

  render() {
    const {auth, change, classes, setFrameState, handleSubmit = noop => noop, step1Valid = false} = this.props

    if (step1Valid !== true) {
      return <Redirect to="/express/create" />
    }

    if (!auth || auth.isAnonymous || auth.authenticated !== true) {
      return <Redirect to="/express/create" />
    }

    return (
      <form onSubmit={ handleSubmit } autoComplete="off">
        <div className={classNames(classes.title)}>
          <Typography
            style={{marginBottom: 16, fontWeight: 400}}
            type="title"
            align="left"
            color="inherit"
            gutterBottom>
            Overview
          </Typography>
        </div>
        <div className={classNames()} style={{marginTop: 0}}>
          <ContentEditor
            name="overview"
            stringify={true}
            // handleFocus={() => setFrameState({extraWide: true})}
            // handleBlur={() => setFrameState({extraWide: false})}
            limit={OVERVIEW_LIMIT}
            placeholder="Add an overview for your fundraiser here..."
            showCharactersLeft
            handleCountChange={(count) => change('count', count)}
            />
        </div>
        <div>
          <Field
            name="count"
            type="hidden"
            label="Count"
            // parse={(value) => !value ? '' : numeral(value).value()}
            component={TextField}
            helpText="The character count"
            // tooltip="Minimum is $500. Currency in USD. You can always increase this later if you need to."
            required />
        </div>
      </form>
    )
  }
}

export default compose(
  withStyles(Style.Step2),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, validate, destroyOnUnmount: false}),
)(Step2)
