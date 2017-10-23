import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


const styles = (theme) => ({
  root: {

  },
  [theme.breakpoints.up(948)]: {
    root: {},
  },
})

function Switch(props) {
  return (
    <ListItem onClick={() => context.handleEditor(props.label, props.value, props.type, props.multiline, props.modal)} ref={node => { context[props.label] = node }} style={{padding: '0 48px 0 0'}} classes={{container: cls.item}} key={props.label}>
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

Switch.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(Theme)
