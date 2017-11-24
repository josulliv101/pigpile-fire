import React, {Component} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import compose from 'recompose/compose'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
import {fade} from 'material-ui/styles/colorManipulator';
//
import {setting} from '../../../redux/modules/Settings'
import {authHandleRedirect, authSignIn, providerIds} from '../../../redux/modules/Auth'
import {Subheading} from '../../../components/Text'
import PigpileExpressFrame from './frame'

const styles = (theme, {unit} = theme.spacing, {palette, vendor} = theme) => ({
  root: {
    background: '#fafafa',
    height: '100vh',
    left: '50vw',
    height: 572,
    // width: 512,
    padding: `${unit * 2}px ${unit * 3}px  ${unit * 3}px`,
    position: 'absolute',
    top: '44vh',
    transform: 'translate3d(-50%, -50%, 0)',
  },

})


class ExpressCreate extends Component {

  render() {
    const {classes: cls, className, ...props} = this.props;
    console.log('ExpressCreate', this.props)
  	return (
    	<Paper
    		className={classNames(cls.root, className)}
    		elevation={16} >
	     <PigpileExpressFrame {...props} />
    	</Paper>
  	)
  }
}

export default compose(
  withStyles(styles),
  connect(({auth}, {location = {}}) => ({
    auth,
    activeStep: location.pathname === '/express/create/3' ? 3 : (location.pathname === '/express/create/2' ? 2 : 1),
  }), {setting})
)(ExpressCreate)
