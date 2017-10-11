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
    position: 'fixed',
    width: '100%',
    willChange: 'transform',
    zIndex: 0,
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
  },
  bg: {},
  ...appThemes,
  [up(values.md)]: {
    root: {
      height: hero.height,
      '&:after': {
        height: hero.height,
      },
    },
  },
});

class BgImage extends Component {
  render() {
  	return (
      <Switch>
        <Route path="/login" render={() => null} />
        <Route path="/" exact render={() => <HomeBg {...this.props} />} />
        <Route path='/:id' render={(ownProps) => <PileBg {...ownProps} {...this.props} />} />
      </Switch>
  	)
  }
}

function HomeBg(props) {
  const {classes: cls, className} = props;
  return (
    <div className={classNames(cls.root, cls.hp, className)}>
     <img className={classNames(cls.bg)} src={appThemes.hp.img} />
    </div>
  )
}

function PileBg(props) {
  const {classes: cls, className, pile = {}, layout = pile.layout || {}, theme} = props;
  console.log('PileBg', layout, props)
  const idThemeDefault = theme.layout.appTheme.default
  // If image layout, the pile should have an imageUrl
  let src = layout['type-image'] && pile.imageUrl;

  // Else use thw default appTheme image
  if (!src) {
    src = appThemes[idThemeDefault].img
  }

  return (
    <div className={classNames(
      cls.root,
      {[cls.image]: layout['type-image']},
      {[cls[idThemeDefault]]: !layout['type-image']},
      className
    )}>
     {pile.imageUrl && <img className={classNames(cls.bg)} src={src} />}
    </div>
  )
}


PileBg = connect((state, {match: {params: {id}}}) => ({
  pile: state.pile[`pile-${id}`],
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

