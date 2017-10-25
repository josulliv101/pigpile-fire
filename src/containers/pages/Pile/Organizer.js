import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import Place from 'material-ui-icons/Place'
//
import {Subheading, Body1, Body2, Title, Headline} from '../../../components/Text'

const styles = (theme, {spacing: {unit}} = theme) => ({
  root: {
    // backgroundColor: theme.palette.grey[800],
    // color: theme.palette.common.white,
    color: theme.palette.common.lightBlack,
    padding: theme.spacing.unit * 2,
  },
  callout: {
    // background: theme.palette.grey[200], // 'rgba(187, 222, 251, 0.32)',
    // border: `1px ${theme.palette.grey[300]} solid`,
    color: theme.palette.primary[500],
    fontWeight: 400,
    // marginBottom: theme.spacing.unit * 2,
    // padding: theme.spacing.unit * 2,
  },
  for: {
    fontSize: 18,
    lineHeight: '26px',
  },
  hr: {
    // backgroundColor: theme.palette.common.white,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  icon: {
    color: theme.palette.grey[400],
    height: 18,
    marginRight: theme.spacing.unit/4,
    width: 18,
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '&>div:first-child': {
      flex: '1 0 auto',
    },
  },
  [theme.breakpoints.up(948)]: {
  },
})

class Organizer extends PureComponent {

  render() {
    const { classes: cls, className } = this.props

    return (
      <Paper
        className={classNames(cls.root, className)}
        elevation={1}
      >
        <Subheading className={cls.callout} gutterBottom>This fundraiser is for a family in need of a service dog for an autistic child.</Subheading>
        {/*<Subheading className={cls.for} heavy>A family in need of funds to acquire a service dog for an autistic child.</Subheading>*/}
        <Divider className={cls.hr} />
        <div className={cls.row}>
          <Body2 component="div" heavy>
            Organizer
          </Body2>
          <Body1>
            Joe Bird
          </Body1>
        </div>
        <div className={cls.row}>
          <Body2 component="div" heavy>
            Location
          </Body2>
          <Place className={cls.icon}/>
          <Body1>
            Cambridge, MA
          </Body1>
        </div>
{/*        <div className={cls.row}>
          <Body2 component="div" heavy>
            Tags
          </Body2>
          <Body1>
            Animals, Autism
          </Body1>
        </div>
        <div className={cls.row}>
          <Body2 component="div" heavy>
            Started On
          </Body2>
          <Body1>
            September 21, 2017
          </Body1>
        </div>*/}
        {/*        <Divider className={cls.hr} />
        <Button dense>fundraiser organizer profile</Button>*/}
      </Paper>
    )
  }
}

Organizer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Organizer)
