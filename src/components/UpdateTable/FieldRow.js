import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IconButton from 'material-ui/IconButton'
import Switch from 'material-ui/Switch'
import {ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from 'material-ui/List'
import Edit from 'material-ui-icons/Edit'
import {withStyles} from 'material-ui/styles'
//
import EditModal from '../../icons/EditModal'
import {Subheading} from '../Text'

const styles = (theme, {unit} = theme.spacing) => ({
  root: {
    '&$success': {
      backgroundColor: 'green',
    },
  },
  field: {
    backgroundColor: theme.palette.common.faintBlack,
    marginRight: unit * 2,
    minWidth: 126,
    padding: `0 ${unit * 6}px 0 0`,
    textTransform: 'capitalize',
  },
  icon: {},
  success: {},
})

class FieldRow extends PureComponent {

  handleClick = (ev) => {
    const {editor, id, label, modal} = this.props
    console.log('row handleClick', this.props)
    // `this` within setParentState fn refers to parent
    this.props.setParentState({
      anchorEl: !modal ? ev.currentTarget : null, 
      open: true, 

      // Add other props here if needed. These all get passed to popup editor.
      editor, 
      id,
      label,
      modal,
    })
  }

  render() {

    const {
      active,
      classes: cls, 
      className, 
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
        className={classNames(cls.root, {[cls.success]: active && success}, className)}
        onClick={this.handleClick}>
        <Subheading className={cls.field} heavy>{label}</Subheading>
        <Subheading heavy noWrap>{value}</Subheading>
        <ListItemSecondaryAction className={cls.icon}>
          <IconButton tabIndex="-1">
            <Icon />
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
