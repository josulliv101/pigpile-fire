import React from 'react'
import classNames from 'classnames'
import Popover from 'material-ui/Popover'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = (theme, {white} = theme.palette.common) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    maxHeight: 72,
    width: 328,
    marginLeft: -28,
    marginTop: -2,
    padding: '12px 24px',
    borderRadius: '6px 0px 0px 6px',
    color: white,
    backgroundColor: 'rgba(0,0,0,.99)', // theme.palette.primary[800],
    position: 'relative',
    overflow: 'visible',
    '&:focus': {
      outline: 'none',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: '100%',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '36px 0 36px 20px',
      borderColor: `transparent transparent transparent ${'rgba(0,0,0,.99)'}`,
    },
  },
  tip: {
    lineHeight: '1.4em',
  },
});

function TextFieldHint({classes, children, ...props}) {
  return (
    <Popover
      PaperProps={{
        className: classNames(classes.root),
      }}
      elevation={4}
      transformOrigin={{horizontal: 'right', vertical: 'center'}}
      anchorOrigin={{horizontal: 'left', vertical: 'center'}}
      {...props}
      >
      <Typography className={classNames(classes.tip)} type="body2" color="inherit">{children}</Typography>
    </Popover>
  )
}

export default withStyles(styles)(TextFieldHint)
