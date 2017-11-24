import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, { InputAdornment } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import Info from 'material-ui-icons/Info'
import { withStyles } from 'material-ui/styles'
import { common } from 'material-ui/colors'
//
import Hint from './TextFieldHint'

const Style = (theme) => ({
  compact: {
    margin: 0,
    marginBottom: theme.spacing.unit * 2,
  },
  dollar: {
    fontSize: 20,
  },
  labelFocused: {
    color: '#999',
  },
  input: {
    fontWeight: 300,
    fontSize: 22,
    width: '100%',
    color: '#000',
    borderTop: '1px rgba(0,0,0,0.12) none',
    borderLeft: '1px rgba(0,0,0,0.12) none',
    borderRight: '1px rgba(0,0,0,0.12) none',
    backgroundColor: 'rgba(0,0,0,0)', //  'rgba(0,0,0,.02)',
    padding: '4px 0 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary[500]}`,
    },
  },
  inputSingleline: {
    fontSize: 20,
    padding: '6px 0px',
  },
  focused: {
    borderBottom: `1px solid ${theme.palette.primary[500]}`,
  },
  info: {
    position: 'absolute',
    top: '-.3em',
    right: 0,
    color: theme.palette.grey[400],
    opacity: .7,
  },
  required: {
    // position: 'absolute',
    // top: 62,
    // right: 4,
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
  const {autoFocus, classes, dense = false, placeholder, helpText, label, dollarAdornment = false, required, tooltip, type = 'text', input, meta: {error, touched, warning}} = field
  // const {value, ...input} = inputProp
  console.log('input', input)
  return (
    <FormControl style={{marginBottom: dense ? 12 : 18, width: '100%', display: type === 'hidden' ? 'none' : 'block' }} >
      <Input
        autoFocus={autoFocus}
        classes={{inputSingleline: classes.inputSingleline, focused: classes.focused}}
        className={classes.input}
        {...input}
        type={type}
        placeholder={placeholder}
        startAdornment={dollarAdornment && <InputAdornment classes={{root: classes.dollar}} disableTypography position="start">$</InputAdornment>}
        fullWidth disableUnderline required />
      <FormHelperText style={{color: touched && error ? '#F17892' : '#666', fontSize: 16, fontWeight: 300, lineHeight: '1.2em', textIndent: '0px'}}>
        {(touched && (error || warning)) || helpText}
        { false && required && <Typography type='body1' component='span' title='required field' className={classes.required}>*</Typography>}
      </FormHelperText>
      {tooltip && <InfoIcon classes={classes} tip={tooltip} label={label} />}

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
          <Hint open={this.state.showPopover}
            anchorEl={this.icon}
            onRequestClose={this.handleTogglePopover}>
            {tip}
          </Hint>
        </div>
      </IconButton>
    )
  }
}

export default withStyles(Style)(TextField)
