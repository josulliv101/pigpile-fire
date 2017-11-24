// import imgBg from '../../components/Hero/landscape-flip.png'
import { common } from 'material-ui/colors'

export const Step1 = (theme) => ({
  positioned: {
    position: 'absolute',
    flex: '1 1 100%', // For footer sticks to bottom when content is short
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
  },
  root: {
    /*    background: `url(${imgBg}) no-repeat center center`,
    backgroundSize: 'cover',
    backgroundPosition: 'left bottom',*/
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
  container: {
    backgroundColor: common.white,
    border: '1px #eee solid',
    padding: '0 24px',
  },
  title: {
    color: theme.palette.primary[500],
    fontSize: 16,
    fontWeight: 300,
  },
  opaque: {
    backgroundImage: 'linear-gradient(180deg,#4180d7,hsla(0,0%,48%,.7))',
    opacity: .72,
  },
  loginBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 3,
    transform: 'translate(-50%, -60%)',
    background: '#fafafa',
    width: 460,
    // minHeight: 500,
    padding: theme.spacing.unit * 3,
    borderRadius: 2,
    height: 534,
    overflow: 'hidden',
    transition: theme.transitions.create('max-height'),
    transitionDuration: '.6s',
    boxShadow: theme.shadows[4],
  },
  login: {
    maxHeight: 534,
  },
  signup: {
    maxHeight: 330,
  },
  lite: {
    fontWeight: 300,
    opacity: .7,
  },
  full: {
    width: 'calc(100% - 0px)',
    marginBottom: theme.spacing.unit * 1,
  },
  noShadow: {
    boxShadow: 'none',
  },
  big: {
    height: 44,
    fontSize: 15,
    position: 'relative',
  },
  fb: {
    backgroundColor: '#3B599C',
  },
  logoFacebook: {
    width: 24,
    height: 24,
    backgroundColor: common.transparent,
    color: common.white,
    position: 'absolute',
    left: 18,
  },
  logoEmail: {
    width: 24,
    height: 24,
    backgroundColor: common.transparent,
    color: common.white,
    position: 'absolute',
    left: 12,
  },
  google: {
    backgroundColor: '#4285f4',
  },
  email: {
    backgroundColor: theme.palette.grey[500],
  },
  loginBtn: {
    marginBottom: theme.spacing.unit * 1,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  orEmail: {
    background: '#fafafa',
    color: theme.palette.primary[600],
    transform: 'translate(-50%, -50%)',
    display: 'inline-block',
    position: 'relative',
    padding: `0 ${theme.spacing.unit * 2}px`,
    left: '50%',
    fontWeight: 400,
    fontSize: 16,
  },
  compact: {
    margin: 0,
    marginBottom: theme.spacing.unit * 2,
  },
  labelFocused: {
    color: '#999',
  },
  input: {
    fontWeight: 300,
    fontSize: 22,
    width: '100%',
    color: '#000',
    borderTop: '1px rgba(0,0,0,0.12) solid',
    borderLeft: '1px rgba(0,0,0,0.12) solid',
    borderRight: '1px rgba(0,0,0,0.12) solid',
    backgroundColor: 'rgba(0,0,0,.02)',
    padding: 8,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    '&:hover': {
      borderBottom: `1px solid ${theme.palette.primary[200]}`,
    },
  },
  focused: {
    borderBottom: `1px solid ${theme.palette.primary[200]}`,
  }
})
