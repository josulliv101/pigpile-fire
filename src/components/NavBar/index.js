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
/*
	componentDidMount = () => {
		console.log('this.navbar', this.navbar) 
		createObserver(this.navbar);
	}
*/
	state = {
		stick: false,
	}

	setSticky = stick => this.setState({stick})

  render() {
    const {classes: cls, className, handleStickyNavChange, stickyEnabled} = this.props;
    console.log('sticky?', this.state.stick)
  	return (
  		<Observer 
  			className={classNames(cls.nav, className)}
  			threshold={1} onChange={ this.setSticky }>
	      <div
	        
	        // ref={node => this.navbar = node}
	        // enabled={stickyEnabled}
	        // innerZ={2}
	        // enableTransforms={false}
	        // onStateChange={handleStickyNavChange}
	      >
	        <main>
	          <Switch>
	            <Route path="/login" render={() => <div>the login page</div>} />
	            <Route path='/' exact={true} component={HomeNav} />
	            <Route path='/:id' component={PileNav} />
	          </Switch>
	        </main>
	      </div>
  		</Observer>

  	)
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(NavBar)

/*

function createObserver(node) {
  var observer;
  console.log('createObserver', node)
  var options = {
    root: document.getElementById('app'),
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(node);
}

function handleIntersect(entries, observer) {
  console.log('handleIntersect', entries, observer)
  entries.forEach(function(entry) {
  	console.log('entry', entry)
  })
}

function buildThresholdList() {
  var thresholds = [];
  thresholds = thresholds.concat(0, .25, .5, .75, 1);
  return thresholds;
}
*/