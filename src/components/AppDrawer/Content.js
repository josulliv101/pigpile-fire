import React, {Component} from 'react'
import { findDOMNode } from 'react-dom';
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
import PopupEditor from './PopupEditor'
import {Subheading} from '../Text'

const styles = (theme) => ({
  root: {
    // padding: theme.spacing.unit * 2,
  },
  btn: {
    backgroundColor: theme.palette.common.faintBlack,
    marginRight: theme.spacing.unit * 2,
    minWidth: 126,
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

  state = {
    anchorEl: null,
    id: null,
    open: false,
    value: null,
  }

  handleClose = () => this.setState({open: false})

  handleEditor = (id, value) => {
    this.setState({anchorEl: findDOMNode(this[id]), open: true, id, value})
  }

  render() {
    const {className, classes: cls, ...pile} = this.props
    const {city, state, postal, country} = pile && pile.location || {}
    return [
      <List
        className={classNames(cls.root, className)}
        dense
        disablePadding
      >
        {/*<ListSubheader disableSticky>Basics</ListSubheader>*/}
        <Divider />
        { Item(this, cls, {label: 'title', value: pile.title}) }
        <Divider />
        { Item(this, cls, {label: 'goal', value: pile.goal}) }
        <Divider />
        { Item(this, cls, {label: 'overview', value: pile.overview}) }
        <Divider />
        { Item(this, cls, {label: 'location', value: `${city}, ${state} ${postal}, ${country}`}) }
        <Divider />
        {/*<ListSubheader disableSticky>People</ListSubheader><Divider />*/}
        
        { Item(this, cls, {label: 'organizer', value: pile.organizer}) }
        <Divider />
        { Item(this, cls, {label: 'beneficiary', value: pile.beneficiary}) }
        <Divider />

        { Item(this, cls, {label: 'story', value: pile.story}) }
        <Divider />

        { Item(this, cls, {label: 'updates', value: 'No updates added yet.' }) }
        <Divider />

        { Item(this, cls, {label: 'images', value: '1 Image'}) }
        <Divider />

        { Item(this, cls, {label: 'tags', value: Object.keys(pile.tags || {}).join(', ') }) }
        <Divider />

      </List>,
      <PopupEditor handleRequestClose={this.handleClose} {...this.state} />
    ]
  }
}

function ItemSwitch(context, cls, props) {
  return (
    <ListItem onClick={() => context.handleEditor(props.label, props.value)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} classes={{container: cls.item}} key={props.label}>
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

function Item(context, cls, props) {
  return (
    <ListItem onClick={() => context.handleEditor(props.label, props.value)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} button classes={{container: cls.item}} key={props.label}>
      <Subheading align="right" className={cls.btn} heavy>{props.label}</Subheading>
      <Subheading heavy noWrap>{props.value}</Subheading>
      <ListItemSecondaryAction className={cls.icon}>
        <IconButton tabIndex="-1">
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
