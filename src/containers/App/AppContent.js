import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
//
import Home from '../pages/Home'
import Pile from '../pages/Pile'

const styles = (theme) => ({
  root: {
    background: theme.palette.common.white,
    minHeight: 240,
    // Slide over the top of the <Hero /> if present
    position: 'relative',
    zIndex: 1,
  },
});

class AppContent extends Component {

  render() {
    const {classes: cls} = this.props;
  	return (
      <div className={cls.root}>
        <Switch>
          <Route path="/login" render={() => <div>the login page</div>} />
          <Route path='/' exact={true} component={Home} />
          <Route path='/:id' component={Pile} />
        </Switch>
      </div>
  	)
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppContent)
