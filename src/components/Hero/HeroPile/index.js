import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
//
import * as appThemes from '../../../style/appThemes/'
import Title from './Title'
import DonateButton from './DonateButton'
import Media from './Media'
import Stats from './Stats'

const styles = (theme, {unit} = theme.spacing, {up, values} = theme.breakpoints) => ({
  root: {
    height: '100vh',
    margin: '0 auto',
    paddingTop: theme.components.hero.paddingTop,
    position: 'relative',
    zIndex: 1,
  },
  gridRoot: {
  	height: '100%', 
  },
  textPosition1: {
  	// default
  },
  textPosition2: {
  	display: 'flex',
  	flexDirection: 'column-reverse',
  },
  textPosition3: {
  	justifyContent: 'flex-end',
  },
  [up(values.md)]: {
    root: {
      height: theme.components.hero.height,
      maxWidth: theme.layout.page.width,
    },
  },
});

class HeroPile extends Component {

  render() {
    const {classes: cls, className, pile: {goal, imageUrl, layout = {}, title} = {}, textPositionPreview: textPositionPreviewProp, textStylePreview: textStylePreviewProp, themePreview} = this.props;
    const currentThemeId = themePreview || layout.theme
    const textStylePreview = textStylePreviewProp && textStylePreviewProp > 0 && {[`textStyle-${textStylePreviewProp}`]: true}

    const textPositionPreview = textPositionPreviewProp && textPositionPreviewProp > 0 && {[cls[`textPosition${textPositionPreviewProp}`]]: true}

    const textPosition = (textPositionPreview && [textPositionPreview]) || [1,2,3].map(n => ({[cls[`textPosition${n}`]]: layout[`textPosition-${n}`]}))
    const {textStyle: textStyleAppTheme} =  appThemes[currentThemeId] || {}
    console.log('text..', textPosition)
  	return (
  		<div className={classNames(cls.root, className)}>
	      <Grid className={cls.gridRoot} container spacing={24}>
	      	<Grid className={classNames(...textPosition)} item xs={8}>
	        	<Title {...(textStylePreview || textStyleAppTheme || layout)}>{title}</Title>
	 					{currentThemeId !== 'layoutImage' && <Media imageUrl={imageUrl} />}
	        </Grid>
	        <Grid item xs={4}>
	        	<DonateButton to="/" />
	        	<Stats goal={goal} />
	        </Grid>
	      </Grid>
  		</div>
  	)
  }
}

HeroPile.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default compose(
	withStyles(styles),
	connect( (state, ownProps) => ({
  	pile: state.pile && state.pile[`pile-${ownProps.pileId}`],
  	themePreview: state.settings && state.settings.themePreview,
  	textStylePreview: state.settings && state.settings.textStylePreview,
  	textPositionPreview: state.settings && state.settings.textPositionPreview,
  })),
)(HeroPile)
