import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Fade from 'material-ui/transitions/Fade';
import dot from 'dot-object'
//
import * as appThemes from '../../../style/appThemes/'
import {setting} from '../../../redux/modules/Settings'
import withSubscriptionToPileShards from '../../../hocs/withSubscriptionToPileShards'
import Title from './Title'
import DonateButton from './DonateButton'
import Media from './Media'
import Stats from './Stats'
import Donate from '../../Donate'
import FormCC from '../../Donate/FormCC'
import FormEmail from '../../Donate/FormEmail'
import DetailsForm from '../../Donate/DetailsForm'
import HowMuchForm from '../../Donate/HowMuchForm'
import FormDone from '../../Donate/FormDone'
import FormShowSupport from '../../Donate/FormShowSupport'

const styles = (theme, {lightBlack, lightWhite} = theme.palette.common, {unit} = theme.spacing, {up, values} = theme.breakpoints) => ({
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
  	'&>button:first-child': {
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

  // Light text, no bg
  titleStyle1: {
  	// the default
  },

  // Light text on dark bg
  titleStyle2: {
  	background: lightBlack,
  	padding: `0 ${unit}px`,
  },

  // Dark text, no bg
  titleStyle3: {
		color: lightBlack,
  },

  // Dark text on light bg
  titleStyle4: {
  	background: lightWhite,
		color: lightBlack,
		padding: `0 ${unit}px`,
  },

  titlePosition1: {
  	// default
  },
  titlePosition2: {
  	alignSelf: 'flex-end',
  },
  titlePosition3: {
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

	state = {
		open: false,
		step: 1,
	}

  componentWillUnmount = () => this.props.setting('drawer', false)

  handleConfirmAmount = () => {
    this.props.history.push({
  		state: {step: 2}
    })
  }

  handleConfirmEmail = () => {
    this.props.history.push({
      state: {step: 3}
    })
  }

  handleCheckout = () => {
    this.props.history.push({
      state: {step: 4}
    })
  }

  handleProcessCC = () => {
    this.props.history.push({
      state: {step: 5}
    })
  }

  handleOnExited = () => this.props.history.push({state: null})
  handleDonate = () => this.setState({open: true})
  requestCloseDonate = () => {
    this.setState({open: false})

  }

  render() {
    const {classes: cls, className, step, theme, pile = {}, themeConfig = {}} = this.props;
    console.log('HeroPile...',  this.props)
    if (!theme || !pile) return null
    const {open} = this.state
    const {
    	config = {},
    	id: currentThemeId,
    	configKeys = Object.keys(config),
    } = theme // themePreview || layout.theme

    // Loop over only the keys that the theme defines as being present for this theme.
    // But take the actual value from the user's config object.
  	const configClasses = configKeys.reduce((sum, key) => {
  		console.log(key, themeConfig[key])
  		sum[key] = cls[`${key}${themeConfig[key]}`]
  		return sum
  	}, {})

  	console.log('sum cls', configClasses, themeConfig)

  	return [
  		<Fade key="donate-fade" in={true}>
	  		<div className={classNames(cls.root, className)}>
		      <Grid className={cls.gridRoot} container spacing={24}>
		      	<Grid className={configClasses.titlePosition} item xs={8}>
		        	<Title className={configClasses.titleStyle}>{pile.title}</Title>
		 					{currentThemeId !== 'panoramic' && <Media imageUrl={pile.imageUrl} />}
		        </Grid>
		        <Grid className={classNames(cls.sidebar, configClasses.sidebarType)} item xs={4}>
		        	<DonateButton onClick={this.handleDonate} />
		        	{<Stats  goal={pile.goal} total={this.props.total} totalOnPile={this.props.totalOnPile} totalShares={this.props.totalShares} />}
		        </Grid>
		      </Grid>
	  		</div>
  		</Fade>,
  		<Donate {...this.state}
  			key="donate-dialog-open"
  			backBtn={step === 2}
  			handleRequestClose={this.requestCloseDonate}
        onExited={this.handleOnExited}
        pid={pile.id}
  			title={this.props.step === 1 ? 'Donate how much??' : (this.props.step === 2 ? 'Send Some Love' : 'Name & Email')}
  		>
  			{step === 1 && (
					<HowMuchForm nextStep={this.handleConfirmAmount} pid={pile.id} />
  			)}
  			{step === 2 && <FormEmail nextStep={this.handleConfirmEmail} pid={pile.id}  />}
        {step === 3 && <FormShowSupport nextStep={this.handleCheckout} pid={pile.id}  />}
        {(step === 3 || step === 4) && <DetailsForm nextStep={this.handleProcessCC} pid={pile.id} show={step === 4}  />}
        {step === 5 && <FormDone pid={pile.id} checkoutDone={this.props.checkoutDone}  />}
  		</Donate>
  	]
  }
}

HeroPile.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

HeroPile.defaultProps = {
  step: 1,
};

const getShardsTotalForType = (type) => (shards = []) => {
  return shards.filter(sh => sh.type === type).reduce((sum, sh) => {
    if (typeof sh.value === 'number') sum = sum + sh.value
    return sum
  }, 0)
}

const getDonationTotal = getShardsTotalForType('donations')
const getShareTotal = getShardsTotalForType('shares')
const getOnPileTotal = getShardsTotalForType('onpile')

export default compose(
	withStyles(styles),
	connect( (state, ownProps) => ({
		history: ownProps.history,
    checkoutDone: dot.pick('settings.checkout.done', state),
  	pile: state.settings && state.settings[`pile-${ownProps.pileId}`],
  	step: dot.pick('location.state.step', ownProps),
    total: getDonationTotal(dot.pick('settings.shards', state)),
    totalShares: getShareTotal(dot.pick('settings.shards', state)),
    totalOnPile: getOnPileTotal(dot.pick('settings.shards', state)),

  	theme: state.theme && (state.theme.preview || state.theme.active),
  	themeConfig: dot.pick('form.pile-update-theme.values.theme.config', state) ||
  							 dot.pick(`settings.pile-${ownProps.pileId}.theme.config`, state)
  }), {setting}),
  withSubscriptionToPileShards(),
)(HeroPile)
