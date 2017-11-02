import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IconButton from 'material-ui/IconButton'
import Switch from 'material-ui/Switch'
import {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Edit from 'material-ui-icons/Edit'
import Check from 'material-ui-icons/Check'
import {withStyles} from 'material-ui/styles'
//
import EditModal from '../../icons/EditModal'
import {Subheading} from '../Text'

const styles = (theme, {unit: u} = theme.spacing) => ({
  root: {
  	backgroundColor: 'rgba(0, 0, 0, .04)',
  	padding: `0 ${u * 4.5}px 0 0`,
  },
  check: {
  	color: 'rgba(255,255,255,.98)',
  	marginRight: -u * 1,
  },
  // Hovers are relative to .container
  container: {
  	// backgroundColor: theme.palette.common.faintBlack,
  	// padding: `0 ${unit * 6}px 0 0`,
    '& $success': {
      backgroundColor: '#D7F1D8',
      '& $field': {
      	backgroundColor: '#9bce9f',
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.common.transparent,
      '& $icon': {
        opacity: .5,
      },
	  	'&$switch $icon': {
	  		opacity: 1,
	  	},
    },
  	'&$switch $icon': {
  		marginRight: u * 1,
  		marginTop: u * -3,
  		opacity: 1,
  	},
  },
  field: {
    backgroundColor: 'rgba(195, 195, 195, 0.1)',
    marginRight: u * 2,
    minWidth: 112,
    width: 112,
    padding: `${u}px ${u * 2}px ${u}px ${u}px`,
    textTransform: 'capitalize',
  },
  icon: {
  	height: 40,
  	marginTop: -20,
  	marginRight: -u/2,
  	opacity: 0,
  	width: 40,
  },
  iconBtn: {
  	height: 40,
  	width: 40,
  },
  success: {},
  switch: {

  },
  value: {},
})

class FieldRow extends PureComponent {

  handleClick = (ev) => {
    const {controlValue, editor, id, label, isSwitch, modal} = this.props
    console.log('row handleClick', this.props, !isSwitch,)
    // `this` within setParentState fn refers to parent
    this.props.setParentState({
      anchorEl: !modal ? ev.currentTarget : null, 

      // Switches don't need a popup. They just toggle. Open popup everything else.
      open: true, // !isSwitch, 

      // Add other props here if needed. These all get passed to popup editor.
      controlValue,
      editor, 
      id,
      isSwitch,
      label,
      modal,
    })
  }

  render() {

    const {
      active,
      classes: cls, 
      className, 
      controlValue: checked,
      id,
      isSwitch = false, 
      
      label, 
      modal,
      success,
      value,
      Icon = isSwitch ? Switch : (modal ? EditModal : Edit),
    } = this.props
    console.log('row render', id, active, success)
    return (
      <ListItem 
        button 
        classes={{container: classNames(cls.container, {[cls.switch]: isSwitch})}}
        className={classNames(cls.root, {[cls.success]: active && success}, className)}
        // disableGutters
        divider
        onClick={this.handleClick}>
        <Subheading align={active && success ? 'center' : 'right'} className={cls.field} heavy>{active && success ? <Check className={cls.check} /> : label}</Subheading>
        <Subheading className={cls.value} heavy noWrap>{value}</Subheading>
        <ListItemSecondaryAction className={cls.icon}>
          <IconButton className={cls.iconBtn} tabIndex="-1">
            <Icon {...(isSwitch ? {checked} : {})} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )		
  }
}

FieldRow.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(FieldRow)
