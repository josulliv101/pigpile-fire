import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu'
//
import {Display1, Body1} from '../../Text'


const styles = (theme, {palette: {common: {white}}, spacing: {unit}} = theme) => ({
  root: {

    display: 'flex',
    justifyContent: 'flex-end',
    padding: unit * 0,
  },
  btn: {
    color: white,
    height: 40,
    width: 40,
  },
  dots: {
    '& svg': {
      height: 24,
      width: 24,
    },
  },
  share: {
    '& svg': {
      height: 20,
      width: 20,
    },
  },
  [theme.breakpoints.up(948)]: {

  },
})

class UtilityBar extends PureComponent {

  state = {
    anchorEl: null,
    open: false,
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleChange = (layout) => {
    this.props.setLayout(layout)
    this.handleRequestClose()
  }

  render() {
    const { classes: cls, className, tooltipPlacement = 'top'} = this.props
// foo
    return (
      <div className={classNames(cls.root, className)} elevation={1}>
        <Button
          color="contrast"
          onClick={this.handleClick}
          dense >
          Themes
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'default'})}>Default Layout</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'autumn'})}>autumn</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'breast'})}>breast</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'burst'})}>burst</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'burlap'})}>burlap</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'denim'})}>denim</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'forest'})}>forest</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'gold'})}>gold</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'grungy'})}>grungy</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'paint-canvas'})}>paint-canvas</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'steel'})}>steel</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'treasure'})}>treasure</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'vintage'})}>vintage</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'weave'})}>weave</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'wood-flag-usa'})}>wood-flag-usa</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'flag-usa'})}>flag-usa</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'circles'})}>circles</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'duckie'})}>duckie</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'pink'})}>pink</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'pink-wave'})}>pink wave</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'blue-wave'})}>blue wave</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'grey-wave'})}>grey wave</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'polygons'})}>polygons</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'splash'})}>splash</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'spotlight'})}>spotlight</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'triangles'})}>triangles</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'default', bg: 'self'})}>Default/BG self</MenuItem>
          <MenuItem onClick={() => this.handleChange({layout: 'wide', bg: 'self'})}>Wide Image Layout</MenuItem>
        </Menu>
      </div>
    )
  }
}

UtilityBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UtilityBar)
