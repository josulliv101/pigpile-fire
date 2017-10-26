import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
//
// import {Subheading} from '../../components/Text'
import Tshirt from '../../../icons/Tshirt'
// import tshirt from './tshirt.png'

const styles = (theme, space = theme.spacing.unit) => ({
  root: {
    background: theme.palette.grey[200],
    // marginBottom: space * 2,
  },
  avatar: {
    color: theme.palette.common.white,
    height: 48,
    width: 48,
    '& svg': {
      height: 32,
      position: 'relative',
      top: 2,
      width: 32,
    },
  },
  dense: {
    lineHeight: '18px',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class TshirtEnabledCallout extends PureComponent {

  render() {
    const { classes: cls, className } = this.props
    return (
      <Paper
        className={classNames(cls.root, className)}
        elevation={1}
      >
        <List>
          <ListItem>
            <ListItemText
              classes={{textDense: cls.dense}}
              // primary="Free Tshirt Give Away"
              secondary="The organizer enabled the 'Free Tshirt Give Away' feature for this fundraiser. Donate to be eligible."
            />
            <Avatar alt="Tshirt Give Away" className={cls.avatar}>
              <Tshirt />
            </Avatar>

          </ListItem>
        </List>
      </Paper>
    )
  }
}

TshirtEnabledCallout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TshirtEnabledCallout)
