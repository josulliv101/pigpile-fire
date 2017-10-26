import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
import Paper from 'material-ui/Paper'
//
// import UtilityBar from './UtilityBar'

const styles = (theme, {unit} = theme.spacing, {white} = theme.palette.common) => ({
  root: {
  	opacity: 0,
  	transition: theme.transitions.create(['opacity']),
  },
  image: {
  	border: `${white} ${unit * 1}px solid`,
  	width: '100%', // Fill up paper
  },
  loaded: {
  	opacity: 1,
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class Media extends PureComponent {

  state = {
    loaded: false,
  }

  ref = node => this.img = node

  handleLoaded = () => this.setState({loaded: true})

  // In case the image has been cached by browser already and onLoad didn't fire.
  componentDidMount = () => this.img && this.img.complete && this.handleLoaded()

  render() {
    const {children, classes: cls, imageUrl} = this.props
    return (
      <Paper className={classNames(cls.root, {[cls.loaded]: this.state.loaded})} elevation={6}>
      	<img 
      		className={cls.image}
      		ref={this.ref} 
      		src={imageUrl} 
      		onLoad={this.handleLoaded} 
      	/>
      </Paper>
    )
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(Media)

