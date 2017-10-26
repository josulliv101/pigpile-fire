import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import {withStyles, withTheme} from 'material-ui/styles'
//
import * as appThemes from '../../style/appThemes/'

const styles = (theme, appThemes = transformAppThemes(theme), {black} = theme.palette.common, {hero} = theme.components, {up, values} = theme.breakpoints) => ({
  root: {
    backgroundColor: black,
    position: 'absolute',
    width: '100%',
    // willChange: 'transform',
    zIndex: 1,
    '&:after': {
      // backgroundImage: 'linear-gradient(180deg,#4180d7,hsla(0,0%,48%,.7))', // linear-gradient(180deg,rgb(33, 150, 243),hsl(207, 83%, 71%))',
      bottom: 0,
      content: '" "',
      display: 'block',
      left: 0,
      opacity: 1,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '&>$bg': {
      height: '100%',
      objectFit: 'cover',
      opacity: 1, // Use with .root backgroundColor to darken/lighten the image
      transition: theme.transitions.create(['width']),
      width: '100%',
    },
    '&$withDrawer>$bg': {
      width: `calc(100% - ${theme.components.drawer.width}px)`,
    },
  },
  bg: {
  	// backgroundColor: theme.palette.common.transparent,
  	// transition: theme.transitions.create(['opacity']),
  },
  loaded: {
  	// opacity: 1,
  },
  notLoaded: {
  	// backgroundColor: 'red',
  	// opacity: 0,
  },
  withDrawer: {},
  ...appThemes,
  [up(values.md)]: {
    root: {
      height: '100%',
      '&:after': {
        height: hero.height,
      },
	    '&>$bg': {
	      height: hero.height,
	    },
    },
    bg: {},
    ...appThemes,
  },
});

class BgImage extends Component {
  render() {
  	return (
      <Switch>
        <Route path="/login" render={() => <LoginBg {...this.props} />} />
        <Route path="/" exact render={() => <HomeBg {...this.props} />} />
        <Route path='/:id' render={(ownProps) => <PileBg {...this.props} {...ownProps} />} />
      </Switch>
  	)
  }
}

function LoginBg(props) {
  const {classes: cls, className} = props;
  return (
    <div className={classNames(cls.root, cls.pageLogin, className)}>
     <img className={classNames(cls.bg)} src={appThemes.pageLogin.img} />
    </div>
  )
}

function HomeBg(props) {
  const {classes: cls, className} = props;
  return (
    <div className={classNames(cls.root, cls.pageHome, className)}>
     <img className={classNames(cls.bg)} src={appThemes.pageHome.img} />
    </div>
  )
}

class PileBg extends Component {

	state = {
		loaded: false,
	}

  ref = node => this.img = node

  handleLoaded = () => this.setState({loaded: true})

  // In case the image has been cached by browser already and onLoad didn't fire.
  componentDidMount = () => this.img && this.img.complete && this.handleLoaded()

	render() {
		const {
	  	classes: cls, 
	  	className, 
	  	pile = {}, 
	  	layout = pile.layout || {}, 
	  	theme: themeProp, 
	  	themePreview
	  } = this.props;

	  
	  const themeId = themePreview || pile.theme || themeProp.layout.appTheme.default
	  const theme = appThemes[themeId]

	  console.log('PileBg', themeId, theme)
	  if (!theme) return null
	  const src = theme.img || pile.imageUrl
	  console.log('theme', theme, src)
	  return (
	    <div className={classNames(
	      cls.root,
	      {[cls.image]: themeId === 'panoramic'},
	      cls[themeId],
	      // {[cls[idThemeDefault]]: !layout['type-image']},
	      {[cls.withDrawer]: this.props.drawer},
	      className
	    )}>
	     {
	     		src && 
	     		<img 
	     			ref={this.ref} 
	     			onLoad={this.handleLoaded} 
	     			className={classNames(
	     				cls.bg, 
	     				// {[cls.loaded]: this.state.loaded},
	     				// {[cls.notLoaded]: !this.state.loaded},
	     			)} 
	     			src={src} 
	     		/>
	     	}
	    </div>
	  )	
	}

}


PileBg = connect((state, {match: {params: {id}}}) => ({
  pile: state.pile[`pile-${id}`],
  themePreview: state.settings && state.settings.themePreview,
}))(PileBg)

BgImage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

// Grab all themes and prepare them so they can be added to style
function transformAppThemes(th) {
  return Object.keys(appThemes).reduce(
    (result, key) => {
      result[key] = appThemes[key] && appThemes[key].getTheme && appThemes[key].getTheme(th) || {};
      return result;
    }
  , {})
}

export default compose(
  withStyles(styles),
  withTheme(),
)(BgImage)

