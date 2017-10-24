import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
//
import {setting} from '../../../redux/modules/Settings'
import DonateButton from './DonateButton'
import Media from './Media'
import Stats from './Stats'

import {Display1, Headline, Title} from '../../Text'

const styles = (theme, {layout, spacing: {unit}} = theme) => ({
  root: {
    display: 'flex',
    margin: '0 auto',
    paddingBottom: unit * 3,
    paddingTop: 0, //layout.paddingTop,
    '&>div:last-child': {
      paddingLeft: unit * 3,
    },
    '&$alignBottom': {
      alignItems: 'flex-end',
    },
    '&$alignRightBottom': {
      alignItems: 'flex-end',
      flexDirection: 'column',
      // justifyContent: 'space-between',
      '&$alignRightBottom>div:last-child': {
        flex: 'none',
        minWidth: '33.33%',
      },
    },
    '&$alignTopBottom>div:last-child': {
      alignSelf: 'flex-end',
    },
  },
  alignBottom: {},
  alignRightBottom: {},
  alignTopBottom: {},
  aside: {
    // background: 'rgba(255,255,255,.4)'
  },
  gridItem: {
    '&>a:first-child': {
      marginBottom: unit * 2,
      marginTop: unit * 5.5,
    },
    '&>h1:first-child': {
      display: 'inline-block',
      marginBottom: unit * .5,
    },
  },
  imageLayout: {
    marginTop: 44,
  },
  main: {
    // background: 'rgba(255,255,255,.6)'
  },
  title: {
    // display: 'inline',
    height: 36,
  },
  [theme.breakpoints.up(700)]: {
    root: {
    },
  },
  [theme.breakpoints.up(960)]: {
    root: {
      height: theme.components.hero.height,
      maxWidth: theme.layout.width,
    },
  },
  [theme.breakpoints.up(1400)]: {
    root: {
    },
  },
  [theme.breakpoints.up(1920)]: {
    root: {
    },
  },
})

class PileHeroImage extends PureComponent {

  state = {}

  
  
  render() {
    const {align = 'top', anchorAside, anchorMain, aside, bg, className, classes: cls, layout: layoutProp, pile = {}, textColor, textContrast, textWeight} = this.props
    const layout = layoutProp || pile.layout

    console.log('hero', pile)

    const titleProps = {
      contrast: textColor === 'lite',
      contrastHigh: textContrast === 'high',
      heavy: textWeight === 'heavy',
    }

    return (
      <Grid className={
        classNames(
          cls.root,
          {[cls.alignBottom]: align === 'bottom'},
          {[cls.alignRightBottom]: align === 'right-bottom'},
          {[cls.alignTopBottom]: align === 'top-bottom'},
          className
        )
      } container spacing={0}>
        <Grid className={
          classNames(
            cls.gridItem,
            cls.main,
          )
        } item xs>
          <Headline className={classNames(cls.title, {[cls.imageLayout]: layout === 'image'})} {...titleProps} noWrap>{pile.title}</Headline>
          {layout === 'default' && <Media {...pile} />}
        </Grid>
        <Grid className={classNames(cls.aside, cls.gridItem)} item xs={4}>
          {<DonateButton to={{pathname: `/pile-${pile.fid}`, state: {donateDialog: true}}} />}
          {aside !== 'slim' && <Stats full={true} />}
        </Grid>
      </Grid>
    )
  }
}

PileHeroImage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

PileHeroImage.defaultProps = {
  align: 'top',
}

export default compose(
  withStyles(styles),
  connect(({pile = {}, settings = {}}, {pileId}) => ({
  	pile: pile[`pile-${pileId}`],
    align: settings.textPosition,
    aside: settings.aside,
    bg: settings.bg,
    layout: settings.layout,
    textColor: settings.textColor,
    textContrast: settings.textContrast,
    textWeight: settings.textWeight,
  })),
  // withInlineHeightStyle(),
)(PileHeroImage)
