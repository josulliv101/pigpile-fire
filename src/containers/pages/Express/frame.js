import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import compose from 'recompose/compose'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import MobileStepper from 'material-ui/MobileStepper'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Expand from 'material-ui-icons/Launch'
import ChevronRight from 'material-ui-icons/ChevronRight'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
//
import HintText from './HintText'

import Step1 from './Step1/'
import Step2 from './Step2/'
import Step3 from './Step3/'
import Step4 from './Step4/'

import * as Style from './style'

const styles = (theme) => ({
  root: {
    transition: theme.transitions.create('width'),
    width: 412,
    '&$xl': {
      width: 660,
    },
  },
  dotActive: {
    background: '#fafafa',
  },
  dot: {
    marginLeft: 3,
    marginRight: 3,
    height: 10,
    width: 10,
  },
  hide: {
    opacity: 0,
  },
  stepper: {
    background: theme.palette.grey[700],
  },
  xl: {},
});

export class PigpileExpressFrame extends React.Component {

  state = {
    extraWide: false,
  }

  // nextStep = () => this.setState({activeStep: this.activeStep + 1})
  // backStep = () => this.setState({activeStep: this.activeStep - 1})

  setFrameState = update => this.setState(update)

  render() {
    const { activeStep, classes, history, ...propsFrame } = this.props
    const { extraWide } = this.state

    console.log('PigpileExpressFrame', this.props)
    return (
      <div className={classNames(classes.root, {[classes.xl]: extraWide && activeStep === 2})}>
        <HintText />
        <Switch>
          <Route path={'/express/create/3'} render={props => <Step3 {...props} setFrameState={this.setFrameState} {...propsFrame} />} />
          <Route path={'/express/create/2'} render={props => <Step2 {...props} setFrameState={this.setFrameState} {...propsFrame} />} />
          <Route path='/express/create' render={props => <Step1 {...props} setFrameState={this.setFrameState} {...propsFrame} />} />
        </Switch>

        <MobileStepper
          className={classNames(

            // {[classes.stepValid]: isStepValid},
            // classes[`step${activeStep}`]
          )}
          classes={{dot: classes.dot, dotActive: classes.dotActive, root: classes.stepper}}
          type="dots"
          steps={3}
          position="bottom"
          activeStep={activeStep-1}
          nextButton={
            <Button
              disabled={activeStep === 3 || !propsFrame.stepValid}
              className={classNames({[classes.hide]: activeStep === 3})}
              color="contrast"
              component={Link}
              to={`/express/create/${activeStep+1}`}
              >
              Next <ChevronRight />
            </Button>
          }
          backButton={
            <Button
              disabled={activeStep === 1}
              className={classNames({[classes.hide]: activeStep === 1})}
              color="contrast"
              component={Link}
              to={`/express/create/${activeStep-1}`}
              >
              <ChevronLeft /> Back
            </Button>
          }
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  foo: ownProps,
  stepValid: ownProps && ownProps.activeStep && state.form && state.form[`pigpile-express-step${ownProps.activeStep}`] && !state.form[`pigpile-express-step${ownProps.activeStep}`].syncErrors,
  step1Valid: ownProps && ownProps.activeStep && state.form && state.form[`pigpile-express-step1`] && !state.form[`pigpile-express-step1`].syncErrors,
  step2Valid: ownProps && ownProps.activeStep && state.form && state.form[`pigpile-express-step2`] && !state.form[`pigpile-express-step2`].syncErrors,
  step3Valid: ownProps && ownProps.activeStep && state.form && state.form[`pigpile-express-step3`] && !state.form[`pigpile-express-step3`].syncErrors,
})

export default compose(
  connect(mapStateToProps, {submit}),
  withStyles(styles),
)(PigpileExpressFrame)
