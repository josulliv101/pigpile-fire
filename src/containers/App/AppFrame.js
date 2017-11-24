import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {Link, Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
//
import {allDone} from '../../redux/modules/Get'
import {setting} from '../../redux/modules/Settings'
import globalStyle from '../../style/global'
import AppBar from '../../components/AppBar'
import AppDrawer from '../../components/AppDrawer'
import AppFooter from '../../components/AppFooter'
import BgImage from '../../components/BgImage'
import Hero from '../../components/Hero'
import NavBar from '../../components/NavBar'

const styles = (theme) => ({
  root: {
    display: 'flex',
    // marginLeft: -theme.components.drawer.width,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    '&$withDrawer': {
      marginLeft: -theme.components.drawer.width,
    },
  },
  drawer: {},
  bd: {
    flex: 1,

  },
  withDrawer: {},
});

class AppFrame extends Component {

  render() {
    const {children, classes: cls, ...props} = this.props;
// open={false} {...props}
  	return (
    	<div className={
        classNames(
          cls.root,
        )}>

    		{/* Drawers */}
        <Switch>
          <Route path="/login" render={() => null} />
          <Route path='/' exact={true} render={() => null} />
          <Route path='/:id' render={({match = {}}) => <AppDrawer open={props.drawer} {...match} match={match} />} />
        </Switch>
        <div className={classNames(cls.bd)}>
          <BgImage {...props} />
	        <Switch>
	        	<Route path="/login" render={() => <AppBar {...props} />} />
          	<Route path='/' exact={true} render={() => <AppBar {...props} />} />
	          <Route path='/:id' render={({match = {}}) => <AppBar {...props} {...match}  />} />
	        </Switch>
          <Hero />
          <NavBar {...props} />
          {children}
	        <Switch>
	          <Route path="/login" render={() => null} />
            <Route path="/express/create" render={() => null} />
	          <Route render={ownProps => <AppFooter />} />
	        </Switch>
        </div>
    	</div>
  	)
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default compose(
  withStyles(styles),
  connect(state => ({
  	auth: state.auth,
    drawer: state.settings.drawer,
    navDocked: state.settings.navDocked,
    loading: !allDone(state) || state.settings.handlingAuthRedirect === true,
  }), {setting}),
)(AppFrame)
