import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
//
import {Subheading} from '../../../components/Text'

const styles = (theme) => ({
  root: {
    ...theme.components.brand,
    fontSize: 24,
    fontWeight: 300,
  },
  promo: {
    display: 'flex',
    '&>div': {
      alignItems: 'center',
      color: theme.palette.common.white,
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      padding: `${theme.spacing.unit * .5}px ${theme.spacing.unit * 2}px`,
      '&>h3': {
        flex: 1,
      },
      '&$space': {
        flex:  `0 1 ${theme.spacing.unit * 2}px`,
        padding: 0,
      },
      '&$promo1': {
        background: theme.palette.grey[700],
      },
      '&$promo2': {
        background: theme.palette.primary[500],
        // paddingRight: 0,
      },
    },
  },
  promo1: {},
  promo2: {},
  space: {},
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})

function PromoInsert(props) {
  const {classes: cls, className} = props
  return (
	  <div className={cls.promo}>
	    <Paper className={cls.promo1} elevation={1}>
	      <Subheading align="left" heavy>Be kind. Pigpile on good causes.</Subheading>
	    </Paper>
	    <div className={cls.space} />
	    <Paper className={cls.promo2} elevation={1}>
	      <Subheading heavy>Go ahead... pile on.</Subheading>
	      <Button color="contrast" dense>Share</Button>
	      <Button color="contrast" dense>Donate</Button>
	    </Paper>
	  </div>
  )
}

PromoInsert.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(PromoInsert)
