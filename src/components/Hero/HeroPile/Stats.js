import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import {LinearProgress} from 'material-ui/Progress'
import Text from 'material-ui/Typography'
import numeral from 'numeral'
// import CountUp from 'react-countup'
//
import Pigtail from '../../../icons/Pigtail'

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 1}px`,
    '&$full $bar': {
      marginBottom: theme.spacing.unit * 3,
    },
  },
  bar: {},
  barProgress: {
    // backgroundColor: '#ff5252', // #ff4081',
  },
  countup: {
    display: 'block',
    fontSize: 36,
    lineHeight: '40px',
    marginBottom: theme.spacing.unit * 1.5,
  },
  determinateBar1: {
    transform: 'scaleX(0)',
    transition: 'transform 1.8s ease-out',
    transitionDelay: '.3s',
  },
  full: {},
  logo: {
    display: 'flex',
    height: 40,
    justifyContent: 'center',
  },
  raisedBar: {
    display: 'flex',
    justifyContent: 'space-between',
    // marginBottom: theme.spacing.unit * 1/2,
    marginTop: theme.spacing.unit * 1/2,
  },
  raisedMin: {
    opacity: 0,
    transition: theme.transitions.create(['opacity']),
    transitionDelay: '.2s',
    '&$show': {
      opacity: 1,
    },
  },
  show: {},
  stats: {
    display: 'none',
    justifyContent: 'flex-start',
    '&>div': {
      flex: '1 0 50%',
    },
    '&>div:first-child': {
      // marginRight: theme.spacing.unit * 5,
    },
  },
  stat: {
    fontSize: 24,
  },
  uppercase: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  [theme.breakpoints.up(700)]: {
    stats: {
      display: 'flex',
    },
  },
  [theme.breakpoints.up(948)]: {
    stats: {
      // display: 'block',
    },
  },
})

class Stats extends PureComponent {

  state = {
    countup: false,
    countupDone: false,
    progress: 0,
  }

  componentDidMount = () => {
    this.setState({progress: 36})
    setTimeout(() => this.setState({countup: true}), 300)
  }

  render() {
    const {className, classes: cls, full = true, goal = 0, justStats = false, total = 0, totalOnPile = 0, totalShares = 0} = this.props
    return (
      <Paper elevation={6} className={classNames(cls.root, {[cls.full]: full}, className)}>
        {
          !justStats &&
          <div className={cls.bar}>
            {
              <div className={classNames(cls.countup)}>{numeral(total).format('$0,0')}</div>
            }

            <LinearProgress classes={{bar: cls.barProgress, determinateBar1: cls.determinateBar1}} color="primary" mode="determinate" value={total/goal*100} />
            <div className={classNames(cls.raisedBar)}>
              <Text type="subheading" color="inherit">{numeral(goal).format('$0,0')} {total>goal?'MINIMUM':''} GOAL </Text>
              <Text className={classNames(cls.raisedMin, {[cls.show]: true})} type="subheading" color="inherit">{numeral(total/goal).format('0%')} RAISED</Text>
            </div>


          </div>
        }

        {
          (full || justStats) &&
          <div className={cls.stats}>
            <div>
              <Text className={cls.uppercase} type="subheading" color="inherit">On the Pigpile</Text>
              <Text className={cls.stat} type="display1" color="inherit">{totalOnPile}</Text>
            </div>
            <div>
              <Text className={cls.uppercase} type="subheading" color="inherit">Shares</Text>
              <Text className={cls.stat} type="display1" color="inherit">{totalShares}</Text>

            </div>
            <div style={{display: 'none'}}>
              <Text className={cls.uppercase} type="body2" color="inherit">Time Left</Text>
              <Text className={cls.stat} type="display1" color="inherit">{22} days</Text>

            </div>
          </div>
        }

      </Paper>
    )
  }
}

Stats.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Stats)

