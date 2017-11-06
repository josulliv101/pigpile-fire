import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
//

const styles = (theme) => ({
  root: {
    boxShadow: theme.shadows[6],
    fontSize: 24,
    fontWeight: 400,
    height: 64,
    // marginBottom: theme.spacing.unit * 2,
    width: '100%',
  },
  [theme.breakpoints.up(948)]: {
    root: {
      fontSize: 28,
      height: 96,
    },
  },
})

class Stats extends PureComponent {

  render() {
    const {className, classes: cls, onVisibilityChange = () => null, ...props} = this.props
    return (
      <Button
        {...props}
        className={classNames(cls.root, className)}
        color="accent"
        // component={Link}
        raised
        // to={{pathname: '/', state: {donateNow: true}}}
      >
        Donate Now
      </Button>
    )
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Stats)

