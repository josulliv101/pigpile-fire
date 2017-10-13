import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import List, { ListItem, ListSubheader, ListItemText } from 'material-ui/List';
import {withStyles} from 'material-ui/styles'
//
import * as appThemes from '../../style/appThemes/'
import {Body2, Subheading} from '../Text'

const styles = (theme, appThemes = transformAppThemes(theme), {black, white} = theme.palette.common) => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  bgRoot: {
    backgroundColor: black,
    height: 100,
    // position: 'fixed',
    // width: '100%',
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
      // width: '100%',
    },
    '&$withDrawer>$bg': {
      // width: `calc(100% - ${theme.components.drawer.width}px)`,
    },
  },
  bg: {},
  imgDefault: {
    border: `1.5px ${white} solid`,
    left: 60,
    position: 'absolute',
    top: 20,
    width: 100,
    zIndex: 9999,
  },
  withDrawer: {},
  ...appThemes,
  [theme.breakpoints.up(948)]: {
    root: {},
  },
})

class Theming extends Component {

  render() {
    const {className, classes: cls, ...pile} = this.props

    return (
      <div className={classNames(cls.root, className)}>
        <Subheading gutterBottom heavy>Select a Theme</Subheading>
        <Body2 gutterBottomLg>Note: In order to use the 'wide-image' theme, your uploaded image must meet be dimensions. If not, the option will be disabled.</Body2>
        <Grid container>
          {
            Object.values(appThemes).map(theme => (
              <Grid key={theme.id} item xs={6}>
                <Card className={cls.card}>
                  <CardMedia
                    className={classNames(
                      cls.bgRoot,
                      {[cls[theme.id]]: true},
                      )}
                    image={theme.img || pile.imageUrl}
                    title={theme.label}
                  >
                    {theme.id !== 'image' && <img className={cls.imgDefault} src={pile.imageUrl} />}
                  </CardMedia>
                  <CardContent>
                    <Subheading heavy>{theme.label}</Subheading>
                  </CardContent>
                </Card>
              </Grid>
            ))
          }
          
        </Grid>
      </div>
    )
  }
}

// Grab all themes and prepare them so they can be added to style
function transformAppThemes(th) {
  return Object.keys(appThemes).reduce(
    (result, key) => {
      result[key] = appThemes[key] && appThemes[key].getTheme && appThemes[key].getTheme(th) || {};
      return result;
    }
  , {})
}

Theming.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(Theming)
