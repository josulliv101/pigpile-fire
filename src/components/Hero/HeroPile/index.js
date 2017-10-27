import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Fade from 'material-ui/transitions/Fade';
//
import * as appThemes from '../../../style/appThemes/'
import {setting} from '../../../redux/modules/Settings'
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
  sidebar: {
  	marginTop: unit * 6,
  	'&>a:first-child': {
  		marginBottom: unit * 3,
  	},
  },
  sidebarType1: {
  	// default
  },
  sidebarType2: {
  	alignSelf: 'flex-end',
  },
  sidebarType3: {
  	alignSelf: 'flex-end',
  },

  textPosition1: {
  	// default
  },
  textPosition2: {
  	alignSelf: 'flex-end',
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

  componentWillUnmount = () => this.props.setting('drawer', false)

  render() {
    const {classes: cls, className, pile: {goal, imageUrl, layout = {}, title} = {}, sidebarTypePreview: sidebarTypePreviewProp, textPositionPreview: textPositionPreviewProp, textStylePreview: textStylePreviewProp, themePreview} = this.props;
    const currentThemeId = themePreview || layout.theme
    const textStylePreview = textStylePreviewProp && textStylePreviewProp > 0 && {[`textStyle-${textStylePreviewProp}`]: true}

    const textPositionPreview = textPositionPreviewProp && textPositionPreviewProp > 0 && {[cls[`textPosition${textPositionPreviewProp}`]]: true}

    const sidebarTypePreview = sidebarTypePreviewProp && sidebarTypePreviewProp > 0 && {[cls[`sidebarType${sidebarTypePreviewProp}`]]: true}
    const sidebar = (sidebarTypePreview && [sidebarTypePreview]) || [1,2,3].map(n => ({[cls[`sidebarType${n}`]]: layout[`sidebarType-${n}`]}))

    const textPosition = (textPositionPreview && [textPositionPreview]) || [1,2,3].map(n => ({[cls[`textPosition${n}`]]: layout[`textPosition-${n}`]}))
    const {textStyle: textStyleAppTheme} =  appThemes[currentThemeId] || {}
    console.log('sidebar..', sidebar)
  	return (
  		<Fade in={true}>
	  		<div className={classNames(cls.root, className)}>
		      <Grid className={cls.gridRoot} container spacing={24}>
		      	<Grid className={classNames(...textPosition)} item xs={8}>
		        	<Title {...(textStylePreview || textStyleAppTheme || layout)}>{title}</Title>
		 					{currentThemeId !== 'layoutImage' && <Media imageUrl={imageUrl} />}
		        </Grid>
		        <Grid className={classNames(cls.sidebar, ...sidebar)} item xs={4}>
		        	<DonateButton to="/" />
		        	{sidebarTypePreviewProp !== 3 && <Stats goal={goal} />}
		        </Grid>
		      </Grid>
	  		</div>
  		</Fade>
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
  	pile: state.settings && state.settings[`pile-${ownProps.pileId}`],
  	themePreview: state.settings && state.settings.themePreview,
  	textStylePreview: state.settings && state.settings.textStylePreview,
  	textPositionPreview: state.settings && state.settings.textPositionPreview,
  	sidebarTypePreview: state.settings && state.settings.sidebarTypePreview,
  }), {setting}),
)(HeroPile)
