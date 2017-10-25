import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
//
import UtilityBar from './UtilityBar'

const styles = (theme) => ({
  root: {
    height: 300,
    marginBottom: theme.spacing.unit * 2,
    opacity: .1,
    overflow: 'hidden',
    position: 'relative',
    border: `${theme.palette.common.white} ${theme.spacing.unit * 1}px solid`,
    transition: theme.transitions.create(['opacity']),
    '&$loaded': {
      opacity: 1,
    },
    '&>img': {
      height: 284,
      objectFit: 'cover',
      // transform: 'scale(1.05, 1.05)',
      width: '100%',
    },
    '&:hover': {
      '& $utils': {
        // backgroundColor: theme.palette.common.minBlack,
      },
    },
  },
  loaded: {},
  utils: {
    backgroundColor: theme.palette.common.minBlack,
    position: 'absolute',
    right: theme.spacing.unit * 1,
    top: theme.spacing.unit * 1,
    // transition: theme.transitions.create(['background-color']),
    zIndex: 9999,
  },
  [theme.breakpoints.up(948)]: {
    root: {
      height: 'calc(100% - 45px)',
      marginBottom: 0,
      '&>img': {
        height: `calc(${theme.layout.hero.height}px - 165px)`,
        minHeight: 266,
      },
    },
    wide: {},
  },
})

class Media extends PureComponent {

  state = {
    loaded: false,
  }

  handleLoaded = () => this.setState({loaded: true})

  // In case the image has been cached by browser already
  componentDidMount = () => this.img && this.img.complete && this.handleLoaded()

  render() {
    const {children, classes: cls, imageUrl} = this.props
    return (
      <Paper className={classNames(cls.root, {[cls.loaded]: this.state.loaded})} elevation={2}>
        {/*<UtilityBar className={cls.utils} tooltipPlacement="bottom" />*/}
        <img ref={node => this.img = node} src={imageUrl} onLoad={this.handleLoaded} />
        {children}
      </Paper>
    )
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Media)

