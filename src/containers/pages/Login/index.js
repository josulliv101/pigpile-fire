import React, {PureComponent} from 'react'
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

const styles = (theme, {unit} = theme.spacing, {palette, vendor} = theme) => ({
  root: {
    background: '#fafafa',
    // alignItems: 'center',
    // display: 'flex',
    height: '100vh',
    // justifyContent: 'center',
    left: '50vw',
    height: 534,
    width: 460,
    padding: unit * 3,
    position: 'absolute',
    top: '44vh',
    transform: 'translate3d(-50%, -50%, 0)',
  },
  btnGroup: {
  	marginBottom: unit * 5,
	  '&>button': {
	  	// background: palette.grey[500],
	  	color: palette.common.white,
	  	marginBottom: unit * 1,
	  	padding: unit * 2,
	  	width: '100%',
	  },
  },
  lightText: {
  	color: palette.lightBlack,
  },

  // Make the vendor colors avalable for buttons
  ...Object.keys(vendor).reduce((sum, key) => {
		sum[key] = {
			background: vendor[key].primary,
			'&:hover': {
				background: fade(vendor[key].primary, .8),
			}
		}
		return sum
	}, {}),
})

const Divider = ({children, classes: cls}) => (
	<Subheading
		align="center"
		className={cls.lightText}
		uppercase>
		{children}
	</Subheading>
)

class Login extends PureComponent {

  componentDidMount = () => {
    // Do a check if we were redirected back here with auth credentials in place.
    // Auth status in redux not there yet, but firebase is if authenticated.
    const {auth, authHandleRedirect, location, settings} = this.props

    console.log('/login loc', this.props.location)
    if (location.search === '?redirect=1' && auth.authenticated !== true) {
    	// setting('handlingAuthRedirect', true)
    	authHandleRedirect()
    }
/*
    if (auth.authenticated !== true) {
    	// User info attached to api obj, no need pass it here.
      authHandleRedirect()
    }
*/
  }

  handleSignIn = (providerId) => {
  	console.log('handleSignIn', this.props)

  	// When 'redirect' param is present, we know that user already initiaed login flow.
  	this.props.history.push({
		  pathname: '/login',
		  search: '?redirect=1'
		})

  	this.props.authSignIn(providerId)
  }

  // componentWillUnmount = () => this.props.settings('handlingAuthRedirect', false)

  render() {
    const {auth, authSignIn, classes: cls, className} = this.props;

    // Forward if already logged in
    if (auth && !auth.isAnonymous && auth.authenticated === true) {
      return <Redirect to="/" />
    }

  	return (
    	<Paper
    		className={classNames(cls.root, className)}
    		elevation={16} >
    		<div className={cls.btnGroup}>
	        <Button className={cls.facebook}>Login with Facebook</Button>
	        <Button
	        	className={cls.github}
	        	onClick={() => this.handleSignIn(providerIds.GITHUB)}>
	        	Login with Github
	        </Button>
	        <Button className={cls.google}>Login with Google</Button>
    		</div>
        <Divider {...this.props}>Or login with email</Divider>
    	</Paper>
  	)
  }
}

export default compose(
  withStyles(styles),
  connect(({auth}) => ({auth}), {authHandleRedirect, authSignIn, setting})
)(Login)
