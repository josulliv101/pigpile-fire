import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
import Button from 'material-ui/Button'
//
// import withInlineHeightStyle from '../hocs/withInlineHeightStyle'
import {Display1, Headline} from '../../Text'

const styles = (theme, {up, values} = theme.breakpoints, {unit} = theme.spacing, {white} = theme.palette.common) => ({
  root: {
  	color: white,
    height: '100vh',
    position: 'relative',
  },
  arrow: {
    bottom: '23%',
    position: 'absolute',
    // top: '73%',
    left: '46%',
    opacity: .4,
    zIndex: 9999,
    width: 45,
    height: 20,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Farrow-curved.png?alt=media&token=c9702b0f-38c8-4e8f-a49a-9648c34b4ead)',
    transform: 'translateX(-180%)'
  },
  arrowText: {
    bottom: '29%',
    position: 'absolute',
    // top: '64%'
    left: 'calc(48%)',
    fontFamily: 'Caveat, Roboto, Arial',
    opacity: .6,
    zIndex: 9999,
    fontSize: 30,
    color: white,
    transform: 'rotate(-6deg) translateX(-180%)',
  },
  chester: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Fchester.png?alt=media&token=6cb3cad2-76ac-46a6-913a-b18701d47066)',
    bottom: '14%',
    top: 'auto',
    // top: '70%',
    height: '130px',
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-42%)', // 88.5
    width: '130px',
    zIndex: 2,
  },
  posTitles: {
    position: 'absolute',
    left: 'calc(50% - 45vw)',
    top: '14%',
    width: '90vw',
    zIndex: 2,
    '&>*:first-child': {
      margin: '0 auto',
      width: '90%',
    },
    '&>*:nth-child(2)': {
      display: 'none',
      marginTop: unit * 2,
      fontSize: 18,
    },
  },
  startFundraiser: {
    border: `1px ${white} solid`,
    display: 'block',
    height: 50,
    margin: `${unit*3.5}px auto`,
    padding: `0 ${unit*4}px`,
    fontSize: 18,
    fontWeight: 300,
  },
  [up(332)]: {
    arrow: {
      bottom: '22%',
    },
    arrowText: {
      bottom: '26%',
    },
    posTitles: {
      '&>*:nth-child(2)': {
        display: 'block',
      },
    },
  },
  [up(700)]: {
    arrow: {
      bottom: '22%',
      height: 27,
      left: '46%',
      // top: '75%',
      width: 60,
    },
    arrowText: {
      bottom: '26%',
      fontSize: 30,
      left: '44%',
      // top: '70%',
    },
    chester: {
      height: 180,
      width: 180,
    },
    posTitles: {
      top: '18%',
      '&>*:nth-child(2)': {
        marginTop: unit * 2,
        fontSize: 24,
      },
    },
  },
  [theme.breakpoints.up(948)]: {
    root: {
      height: 600, // theme.components.hero.height,
    },
    arrow: {
      bottom: 'auto',
      left: '47%',
      top: 452,
    },
    arrowText: {
      bottom: 'auto',
      left: '46%',
      top: 400,
    },
    chester: {
      bottom: 'auto',
      top: 370,
    },
  },
  [up(values.md)]: {
    root: {
      height: theme.components.hero.height,
    },
  },
  [theme.breakpoints.up(1400)]: {
    root: {
      height: theme.components.hero.height,
    },
    arrow: {
      left: '48%',
      // top: '37%',
    },
    arrowText: {
      left: '47%',
      // top: '33%',
    },
    chester: {
      bottom: 'auto',
      top: 370,
    },
  },
});

function HeroHome(props) {
  const {className, classes: cls} = props
  return (
    <div className={classNames(cls.root, className)}>
      <div className={cls.posTitles}>
        <Display1 align="center" gutterBottom lite>Be kind. Pigpile on good causes.</Display1>
        <Headline align="center" lite>Free Online Fundraising. No 5% fee.</Headline>
        <Button className={cls.startFundraiser} color="contrast">Start a Fundraiser</Button>
      </div>
      <div className={cls.chester} />
      <div className={cls.arrowText}>Chester</div>
      <div className={cls.arrow} />
    </div>
  )
}

HeroHome.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  connect(),
  // withInlineHeightStyle(),
)(HeroHome)
