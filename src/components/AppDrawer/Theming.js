import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemText } from 'material-ui/List';
import {withStyles} from 'material-ui/styles'
//
import {Body2, Subheading} from '../Text'

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
        <Subheading gutterBottom heavy>Select a Theme</Subheading>
        <Body2>Note: In order to use the 'wide-image' theme, your uploaded image must meet be dimensions. If not, the option will be disabled.</Body2>
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
