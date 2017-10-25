import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import MuiButton from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
//
import Button from '../Button'
import {setting} from '../../redux/modules/Settings'

const styles = (theme, {common: {white}} = theme.palette) => ({
  root: {
  	padding: '1px 0',
  },

  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function PileNav(props) {
  const {className, classes: cls, drawer, setting} = props
  return (
    <div className={classNames(cls.root, className)}>
      <MuiButton onClick={() => setting('drawer', !drawer)} color="contrast">
        Overview
      </MuiButton>
      <Button to="/" to="/" >
        The Story
      </Button>
      <Button to="/" to="/" >
        Updates
      </Button>
      <Button to="/" to="/" >
        Comments
      </Button>
    </div>
  )
}

PileNav.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  connect(state => ({drawer: state.settings.drawer}), {setting}),
)(PileNav)
