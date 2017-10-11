import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {Route, Switch} from 'react-router-dom'
import {withStyles} from 'material-ui/styles'
//
import * as appThemes from '../../style/appThemes/'

const styles = (theme, appThemes = transformAppThemes(theme), {black} = theme.palette.common, {hero} = theme.components, {up, values} = theme.breakpoints) => ({
  root: {
    backgroundColor: black,
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
    const {classes: cls, className, ...props} = this.props;
  	return (
      <Switch>
        <Route path="/" exact render={() => {
          return (
            <div className={classNames(cls.root, cls.hp, className)}>
             <img className={classNames(cls.bg)} src={appThemes.hp.img} />
            </div>
          )
        }} />
        <Route path='/:id' render={() => {
          return (
            <div className={classNames(cls.root, cls.image, className)}>
             <img className={classNames(cls.bg)} src={"https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/foobar%2Fdog.jpeg?alt=media&token=8fa7707d-6aff-4ca0-9e5c-7e86b4ac70bf"} />
            </div>
          )
        }} />

      </Switch>
  	)
  }
}

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
)(BgImage)

