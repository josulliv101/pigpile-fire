import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
//
import Home from '../pages/Home'
import Pile from '../pages/Pile'

const styles = (theme) => ({
  root: {

  },
});

class AppContent extends Component {

  render() {
    const {classes: cls} = this.props;
  	return (
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/:id' component={Pile} />
      </Switch>
  	)
  }
}

AppContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppContent)
