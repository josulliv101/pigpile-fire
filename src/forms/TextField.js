import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input from 'material-ui/Input'
import Popover from 'material-ui/Popover'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Info from 'material-ui-icons/Info'
import { withStyles } from 'material-ui/styles'
import { common } from 'material-ui/colors'

const Style = (theme) => ({
  compact: {
    margin: 0,
    marginBottom: theme.spacing.unit * 2,
  },
  labelFocused: {
    color: '#999',
  },
  input: {
    fontWeight: 300,
    fontSize: 22,
    width: '100%',
    color: '#000',
    borderTop: '1px rgba(0,0,0,0.12) solid',
    borderLeft: '1px rgba(0,0,0,0.12) solid',
    borderRight: '1px rgba(0,0,0,0.12) solid',
    backgroundColor: 'rgba(0,0,0,.02)',
    padding: 8,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary[200]}`,
    },
  },
  focused: {
    borderBottom: `1px solid ${theme.palette.primary[200]}`,
  },
  info: {
    position: 'absolute',
    top: '.3em',
    right: 0,
    color: theme.palette.grey[400],
  },
  arrow_box: {
    height: 72,
    width: 300,
    marginLeft: -28,
    marginTop: -2,
    padding: '12px 24px',
    borderRadius: '6px 0px 0px 6px',
    color: common.white,
    backgroundColor: 'rgba(0,0,0,.7)', // theme.palette.primary[800],
    position: 'relative',
    overflow: 'visible',
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: '100%',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '36px 0 36px 20px',
      borderColor: `transparent transparent transparent ${'rgba(0,0,0,.7)'}`,
    },
  },
  tip: {
    lineHeight: '1.2em',
  },
  required: {
    position: 'absolute',
    top: 62,
    left: 4,
    //
    fontWeight: 400,
    fontSize: 24,
    color: '#aba6a6',
    display: 'inline-block',
    width: 18,
    height: 18,
    marginRight: 4,
    verticalAlign: 'middle',
    textAlign: 'center',
    lineHeight: '27px',
    background: 'rgba(255,255,255,.1)',
    borderRadius: '50%',
  }
})


function TextField(field) {
  const {autoFocus, classes, dense = false, placeholder, helpText, label, required, tooltip, type = 'text', input, meta: {error, touched, warning}} = field
  // const {value, ...input} = inputProp
  console.log('input', input)
  return (
    <FormControl style={{marginBottom: dense ? 12 : 36, width: '100%', display: type === 'hidden' ? 'none' : 'block' }} >
      <Input autoFocus={autoFocus} classes={{focused: classes.focused}} className={classes.input} {...input} type={type} placeholder={placeholder} fullWidth disableUnderline required />
      <FormHelperText style={{color: touched && error ? '#F17892' : '#999', fontSize: 16, lineHeight: '1.2em', textIndent: '24px'}}>{(touched && (error || warning)) || helpText}</FormHelperText>
      {tooltip && <InfoIcon classes={classes} tip={tooltip} label={label} />}
      {required && <Typography type='body1' component='span' title='required field' className={classes.required}>*</Typography>}
    </FormControl>
  )
}

class InfoIcon extends PureComponent {

  state = {
    showPopover: false,
  }

  handleTogglePopover = () => this.setState({showPopover: !this.state.showPopover})

  render() {
    const {classes, tip} = this.props
    console.log('ref', this)
    return (
      <IconButton className={classes.info} onClick={this.handleTogglePopover}>
        <div ref={(icon) => { this.icon = icon }}>
          <Info style={{width: 24, height: 24}}/>
          <Popover className={classNames(classes.arrow_box)} elevation={4} open={this.state.showPopover} transformOrigin={{horizontal: 'right', vertical: 'center'}} anchorOrigin={{horizontal: 'left', vertical: 'center'}} anchorEl={this.icon} onRequestClose={this.handleTogglePopover}>
            {/*<Typography gutterBottom type="title" color="inherit">{label}</Typography>*/}
            <Typography className={classNames(classes.tip)} type="body2" color="inherit">{tip}</Typography>
          </Popover>
        </div>
      </IconButton>
    )
  }
}

export default withStyles(Style)(TextField)
