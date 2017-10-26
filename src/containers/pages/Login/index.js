import React, {PureComponent} from 'react'
import classNames from 'classnames'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
import {fade} from 'material-ui/styles/colorManipulator';
//
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
    top: '50vh',
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
		heavy 
		uppercase>
		{children}
	</Subheading>
)

class Login extends PureComponent {

  render() {
    const {classes: cls, className} = this.props;
  	return (
    	<Paper 
    		className={classNames(cls.root, className)}
    		elevation={16} >
    		<div className={cls.btnGroup}>
	        <Button className={cls.facebook}>Login with Facebook</Button>
	        <Button className={cls.github}>Login with Github</Button>
	        <Button className={cls.google}>Login with Google</Button>
    		</div>
        <Divider {...this.props}>Or login with email</Divider>
    	</Paper>
  	)
  }
}

export default withStyles(styles)(Login)
