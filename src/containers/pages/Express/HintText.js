import React from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = (theme) => ({
  root: {
    position: 'absolute',
    top: -28,
    right: 2,
    color: '#fff',
    fontSize: 16,
    fontWeight: 300,
    '& span': {
      fontWeight: 400,
      fontSize: 24,
      color: '#fff',
      display: 'none', //  'inline-block',
      width: 20,
      height: 20,
      marginRight: 0,
      verticalAlign: 'middle',
      textAlign: 'center',
      lineHeight: '28px',
    },
  },
});

function HintText({classes}) {
  return (
    <Typography
      className={classes.root}
      color="inherit">
      <span>*</span>
      All fields are required.
    </Typography>
  )
}

export default withStyles(styles)(HintText)
