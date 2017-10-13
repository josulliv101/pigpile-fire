import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Switch from 'material-ui/Switch';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import {withStyles} from 'material-ui/styles'
import Edit from 'material-ui-icons/Edit';
//
import {Subheading} from '../Text'

const styles = (theme) => ({
  root: {
    // padding: theme.spacing.unit * 2,
  },
  btn: {
    backgroundColor: theme.palette.common.faintBlack,
    marginRight: theme.spacing.unit * 2,
    minWidth: 132,
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
  },
  item: {
    '&:hover': {
      '& $icon': {
        opacity: 1,
      },
    },
  },
  icon: {
    opacity: 0,
  },
  listSection: {
    background: 'inherit',
  },
  [theme.breakpoints.up(948)]: {
    root: {},
  },
})

class Content extends Component {

  render() {
    const {className, classes: cls, ...pile} = this.props
    const {city, state, postal, country} = pile && pile.location || {}
    return (
      <List
        className={classNames(cls.root, className)}
        dense
        disablePadding
      >
        {/*<ListSubheader disableSticky>Basics</ListSubheader>*/}
        <Divider />
        { Item(cls, {label: 'title', value: pile.title}) }
        <Divider />
        { Item(cls, {label: 'goal', value: pile.goal}) }
        <Divider />
        { Item(cls, {label: 'overview', value: pile.overview}) }
        <Divider />
        { Item(cls, {label: 'location', value: `${city}, ${state} ${postal}, ${country}`}) }
        <Divider />
        {/*<ListSubheader disableSticky>People</ListSubheader><Divider />*/}
        
        { Item(cls, {label: 'organizer', value: pile.organizer}) }
        <Divider />
        { Item(cls, {label: 'beneficiary', value: pile.beneficiary}) }
        <Divider />

        { Item(cls, {label: 'story', value: pile.story}) }
        <Divider />

        { Item(cls, {label: 'updates', value: 'No updates added yet.' }) }
        <Divider />

        { Item(cls, {label: 'images', value: '1 Image'}) }
        <Divider />

        { Item(cls, {label: 'tags', value: Object.keys(pile.tags || {}).join(', ') }) }
        <Divider />
      </List>
    )
  }
}

function ItemSwitch(cls, props) {
  return (
    <ListItem style={{padding: '0 64px 0 0'}} classes={{container: cls.item}} key={props.label}>
      <Subheading align="right" className={cls.btn} heavy>{props.label}</Subheading>
      <Subheading heavy noWrap>Fundraiser is currently {props.value ? 'active' : 'inactive'}.</Subheading>
      <ListItemSecondaryAction>
        <Switch
          // onClick={this.handleToggle('bluetooth')}
          checked={props.value}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function Item(cls, props) {
  return (
    <ListItem style={{padding: '0 64px 0 0'}} button classes={{container: cls.item}} key={props.label}>
      <Subheading align="right" className={cls.btn} heavy>{props.label}</Subheading>
      <Subheading heavy noWrap>{props.value}</Subheading>
      <ListItemSecondaryAction className={cls.icon}>
        <IconButton aria-label="Edit">
          <Edit />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(Content)
