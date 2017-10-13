import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {withStyles} from 'material-ui/styles'
//

const styles = (theme) => ({
  root: {
    padding: theme.spacing.unit * 2,
  },

  [theme.breakpoints.up(948)]: {
    root: {},
  },
})

class Theming extends Component {

  render() {
    const {className, classes: cls, pile = {}} = this.props

    return (
      <div className={classNames(cls.root, className)}>
        ... Theming
      </div>
    )
  }
}

Theming.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(Theming)
