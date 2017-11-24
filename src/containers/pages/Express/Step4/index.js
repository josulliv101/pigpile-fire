import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
//
// import EditorField from '../Editor'
import * as Style from './style'
// import { fundraiserCreate } from '../../../redux/modules/FundraiserCreate/'

const FORM_NAME = 'pigpile-express-step4'

const validate = values => {
  const errors = {}
  if (!values.story) {
    errors.story = 'A story is required.'
  }
  return errors
}

export class Step4 extends React.Component {

  state = {
    full: true,
  }

  handleCreate = () => {


  }

  render() {
    const {classes, handleSubmit = noop => noop, loading} = this.props

    return (
      <form onSubmit={ handleSubmit } className={classNames(classes.formStep4, {[classes.loading]: loading})} autoComplete="off">
        <div className={classNames(classes.title)}>
          <Typography
            style={{marginBottom: 22, fontWeight: 300}}
            type="title"
            align="center"
            color="inherit"
            gutterBottom>
            The Story
          </Typography>
        </div>

        <div style={{textAlign: 'center', position: 'absolute', bottom: 92, left: '50%', transform: 'translateX(-50%)'}}>
          <Button raised color="accent" onClick={this.handleCreate}>Create Fundraiser</Button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = (state) => ({
  formStep1: state.form && state.form['pigpile-express-step1'],
  formStep2: state.form && state.form['pigpile-express-step2'],
  formStep3: state.form && state.form['pigpile-express-step3'],
  formStep4: state.form && state.form['pigpile-express-step4'],
  auth: state.auth,
  loading: state.fundraiser.creating,
})

export default compose(
  connect(mapStateToProps, {}),
  withStyles(Style.Step4),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, validate, destroyOnUnmount: false}),
)(Step4)
