import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Grow from 'material-ui/transitions/Fade'
//
import {Display1, Body1} from '../../../components/Text'
import Facebook from '../../../icons/Facebook'
import Google from '../../../icons/Google'
import Twitter from '../../../icons/Twitter'

const styles = (theme, {spacing: {unit}, vendor: {facebook, google, twitter}} = theme) => ({
  root: {
    minHeight: 56,

    padding: theme.spacing.unit * 0,
    position: 'relative',
    '&$small': {
      backgroundColor: theme.palette.common.transparent,
      boxShadow: 'none',
      flex: 1,
      // left: 0,
      // maxWidth: 240,
      minHeight: 36,
      // position: 'relative',

      '&>$btnGroup': {
        flex: 1,
        '&>button': {
          alignItems: 'center',
          // color: theme.palette.grey[400],
          display: 'flex',
          flex: '0 0 18%',
          height: 36,
          justifyContent: 'center',
          minHeight: 36,
          minWidth: 12,
          '& svg': {

            height: 18,
            marginRight: 0,

            width: 18,
          },
          '&$fb': {
            background: theme.palette.common.transparent,
            '& svg': {
              left: 4,
              position: 'relative',
              top: -4,
            },
          },
          '&$google': {
            background: theme.palette.common.transparent,
            '& svg': {
              position: 'relative',
              top: -4,
            },
          },
          '&$twitter': {
            background: theme.palette.common.transparent,
            '& svg': {
              position: 'relative',
              top: -2,
            },
          },
        },
      },
    },
  },
  btnGroup: {
    display: 'flex',
    // flexDirection: 'column',
    // marginBottom: theme.spacing.unit * 1,
    padding: unit,
    position: 'relative',
    zIndex: 2,
    // width: '100%',
    '&>button': {
      flex: '0 0 33.33%',
      margin: `${unit/2}px`,
      minHeight: 56,
      // width: '33.33%',
      // theme.transitions.create(['transform']),
      '&:first-child': {
        marginTop: 0,
      },
      '&:nth-child(2)': {
        // maxWidth: 0,
        // minWidth: 0,
      },
      '&:last-child': {
        marginBottom: 0,
        // maxWidth: 0,
        // minWidth: 0,
      },
    },
  },
  fb: {
    background: facebook.primary,
    '&:hover': {
      background: fade(facebook.primary, .88),
    },
  },
  google: {
    background: google.primary,
    '&:hover': {
      background: fade(google.primary, .88),
    },
    '& svg': {
      marginRight: unit * 1,
    },
  },
  small: {},
  twitter: {
    background: twitter.primary,
    '&:hover': {
      background: fade(twitter.primary, .88),
    },
    '& svg': {
      marginRight: unit * 1,
      position: 'relative',
      top: 2,
    },
  },
  [theme.breakpoints.up(948)]: {
    btnGroup: {
      flexDirection: 'row',
      padding: 0,
      '&>button': {
        margin: 0,
      },
    },
  },
})

class ShareBar extends PureComponent {

  state = {
    stage: 0,
    startAt: 0,
  }

  handleShare = () => {

    const {stage, startAt} = this.state
    console.log('handleShare', stage, startAt)
    this.setState({
      startAt: startAt + 1,
      stage: startAt > 5 ? stage + 1 : stage
    })
    if (startAt === 10) clearTimeout(this.shareTime)
  }

  componentDidMount = () => {
    // this.shareTime = setInterval(() => this.handleShare(), 1000)
  }

  componentWillUnmount = () => {
    clearTimeout(this.shareTime)
  }

  render() {
    const { classes: cls, className, color = 'contrast', labels, small } = this.props
    const {stage} = this.state
    return (
      <Paper
        className={classNames(cls.root, {[cls.small]: small}, className)}
        elevation={ small ? 0 : 1}
      >
        <div className={classNames(cls.btnGroup)}>
          {
            stage > -1 &&
            <Grow in={true} direction="left">
              <Button className={cls.fb} color={color}>
                <Facebook /> {labels && 'Facebook'}
              </Button>
            </Grow>
          }
          {
            stage > -1 &&
            <Grow in={true} direction="left">
              <Button className={cls.twitter} color={color}>
                <Twitter /> {labels && 'Twitter'}
              </Button>
            </Grow>
          }

          {
            stage > -2 &&
            <Grow in={true} direction="left">
              <Button className={cls.google} color={color}>
                <Google /> {labels && 'Google'}
              </Button>
            </Grow>
          }
        </div>

      </Paper>
    )
  }
}

ShareBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ShareBar)
