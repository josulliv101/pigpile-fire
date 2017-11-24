// import { common } from 'material-ui/colors'

export const PigpileExpressFrame = (theme) => ({
  fullViewport: {
    position: 'absolute',
    flex: '1 1 100%',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  bgOverlay: {
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      display: 'block',
      backgroundImage: 'linear-gradient(180deg,#4180d7,hsla(0,0%,48%,.7))',
      opacity: .9,
    },
  },
  bg: {
    // transform: 'scale(1.1,1.1)',
    filter: 'blur(6px)',
    zIndex: 0,
    height: '100vh',
    width: 'auto',
  },
  loginBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: 900,
    zIndex: 3,
    transform: 'translate(-50%, -60%)',
    background: '#fafafa',
    width: 460,
    // minHeight: 500,
    padding: theme.spacing.unit * 4,
    borderRadius: 2,
    height: 534,
    overflow: 'visible',
    transition: theme.transitions.create(['max-height', 'width', 'height', 'top']),
    transitionDuration: '.6s',
    willChange: 'width, height, top',
    boxShadow: theme.shadows[4],
    '&$expanded': {
      top: '55%',
      width: '900px',
      height: '700px',
      '&$step4 $expandBtn': {
        transform: 'rotate(-180deg)',
      },
    },
    '&$step4 $expandBtn': {
      display: 'block',
      opacity: .7,
    },
  },
  expandBtn: {
    // display: 'none',
    opacity: 0,
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create(['transform', 'opacity']),
    transitionDelay: '.4s,.4s',
  },
  step1: {},
  step2: {},
  step3: {},
  step4: {},
  expanded: {},
  hintRequired: {
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
      display: 'inline-block',
      width: 20,
      height: 20,
      marginRight: 0,
      verticalAlign: 'middle',
      textAlign: 'center',
      lineHeight: '28px',
    },
  },
  stepper: {
    position: 'absolute',
    '& button': {
      opacity: 1,
      transition: theme.transitions.create(['opacity']),
    },
    '& button:last-child': {
      opacity: .3,
    },
    '&$step1': {
      '& button:first-child': {
        visibility: 'hidden',
      },
    }
  },
  stepValid: {
    '& button:last-child': {
      opacity: 1,
    },
  },
})
