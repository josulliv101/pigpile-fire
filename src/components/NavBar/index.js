import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Route, Switch} from 'react-router-dom'
// import Sticky from 'react-stickynode'
import Observer from 'react-intersection-observer'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
//
import HomeNav from './HomeNav'
import PileNav from './PileNav'

const styles = (theme, {primary, common: {black, white}} = theme.palette) => ({
  root: {
    '&>div': {
      backgroundColor: black,
      boxShadow: theme.shadows[4],
      color: white,
    },
    // position: 'relative',
    // zIndex: 1,
  },
  nav: {
		backgroundColor: black,
		boxShadow: theme.shadows[4],
		color: white,
    position: 'sticky',
    top: -1,
    willChange: 'transform',
    zIndex: 3,
  },
  stick: {
  	position: 'sticky',
  }
});

// 'handleStickyNavChange', 'stickyEnabled' & 'navDocked' props are coming from
// the 'withStickyNav' HOC that wraps the App component
class NavBar extends Component {

	setSticky = inView => this.props.setting('navDocked', !inView)

  render() {
    const {classes: cls, className} = this.props;
  	return (
  		<Observer 
  			className={classNames(cls.nav, className)}
  			threshold={1} 
  			onChange={ this.setSticky }>
	        <main>
	          <Switch>
	            <Route path="/login" render={() => null} />
	            <Route path='/' exact={true} component={HomeNav} />
	            <Route path='/:id' component={PileNav} />
	          </Switch>
	        </main>
  		</Observer>
  	)
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(NavBar)
