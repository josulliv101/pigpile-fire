import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import {Link} from 'react-router-dom'
import Sticky from 'react-stickynode'
import { withStyles } from 'material-ui/styles'
//


const styles = (theme, {primary, common: {black, white}} = theme.palette) => ({
  root: {
    '&>div': {
      backgroundColor: black,
      color: white,
    },
    // position: 'relative',
    // zIndex: 1,
  },

});

class NavBar extends Component {

  handleStickyNavChange = (status) => {
    console.log('sticky', status)
  }

  render() {
    const {classes: cls, className} = this.props;
  	return (
      <Sticky
        className={classNames(cls.root, className)}
        enabled={true}
        innerZ={2}
        enableTransforms={false}
        onStateChange={this.handleStickyNavChange}
      >
        <main>
          navbar
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
