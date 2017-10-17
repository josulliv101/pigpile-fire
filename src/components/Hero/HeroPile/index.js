import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
//
import Title from './Title'
import DonateButton from './DonateButton'
import Media from './Media'
import Stats from './Stats'

const styles = (theme, {unit} = theme.spacing, {up, values} = theme.breakpoints) => ({
  root: {
  	// background: theme.palette.common.lightWhite,
    height: '100vh',
    margin: '0 auto',
    paddingTop: theme.components.hero.paddingTop,
    position: 'relative',
    zIndex: 1,
  },
  [up(values.md)]: {
    root: {
      height: theme.components.hero.height,
      maxWidth: theme.layout.page.width,
    },
  },
});

class HeroPile extends PureComponent {

  render() {
    const {classes: cls, className, pile: {goal, imageUrl, layout = {}, title} = {}} = this.props;
  	return (
  		<div className={classNames(cls.root, className)}>
	      <Grid container spacing={24}>
	      	<Grid item xs={12}>
	        	<Title {...layout}>{title}</Title>
	        </Grid>
	        <Grid item xs={8}>
	 					<Media imageUrl={imageUrl} />
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
  })),
)(HeroPile)
