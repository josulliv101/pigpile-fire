import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Route, Switch} from 'react-router-dom'
import Sticky from 'react-stickynode'
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

});

// 'handleStickyNavChange', 'stickyEnabled' & 'navDocked' props are coming from
// the 'withStickyNav' HOC that wraps the App component
class NavBar extends Component {

  render() {
    const {classes: cls, className, handleStickyNavChange, stickyEnabled} = this.props;
  	return (
      <Sticky
        className={classNames(cls.root, className)}
        enabled={stickyEnabled}
        innerZ={2}
        enableTransforms={false}
        onStateChange={handleStickyNavChange}
      >
        <main>
          <Switch>
            <Route path="/login" render={() => <div>the login page</div>} />
            <Route path='/' exact={true} component={HomeNav} />
            <Route path='/:id' component={PileNav} />
          </Switch>
        </main>
      </Sticky>
  	)
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(NavBar)
