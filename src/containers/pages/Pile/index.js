import React, {Component} from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import DraftEditorContents from 'draft-js/lib/DraftEditorContents.react'
import DefaultDraftBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap'
//
import withGetPile from '../../../hocs/withGetPile'
import LogoCard from '../../../components/LogoCard'
import {Subheading} from '../../../components/Text'
import Stats from '../../../components/Hero/HeroPile/Stats'
import PromoInsert from './PromoInsert'
import ShareBar from './ShareBar'
import Organizer from './Organizer'
import TshirtEnabledCallout from './TshirtEnabledCallout'
import MeetChesterSection from '../../../sections/MeetChester'

const styles = (theme, {unit} = theme.spacing) => ({
  root: {
  	paddingTop: unit * 5,
  },
  full: {
    background: 'linear-gradient(to bottom, #fafafa 30%,#efefef 100%)',
    paddingBottom: unit * 3,
  },
  gridMain: {
  	'&>div': {
  		marginBottom: unit * 2,
  	},
  },
  gridAside: {
  	'&>div': {
  		marginBottom: unit * 2,
  	},
  },
})

class Pile extends Component {

  componentDidCatch(error, errorInfo) {
    console.log('ERROR CAUGHT', error, errorInfo)
  }

  getDonations = (items) => items.map((d, i) => <li key={i}>{d.name} / ${d.amount}</li>)

  getDraftEditorState = fieldId => {
  	const {pile = {}} = this.props;
  	const raw = pile[fieldId] && typeof pile[fieldId] === 'string' ? JSON.parse(pile[fieldId]) : pile[fieldId]
		const contentState = pile[fieldId] && convertFromRaw(raw)
		return pile[fieldId] && EditorState.createWithContent(contentState)
  }

  

  render() {
    const {classes: cls, className, donations = [], match, pile = {}} = this.props;
    console.log('getPile', this.props)
    console.log('pile', pile)
  	return (
  		[
	      <section key="main" className={classNames(cls.full)}>
	        <main className={classNames(cls.root, className)}>
			      <Grid container spacing={24}>
			      	<Grid className={cls.gridMain} item xs={8}>
			          <LogoCard title="Overview">
			          	{ pile.overview && <Editor editorState={this.getDraftEditorState('overview')} readOnly/> }
			          </LogoCard>
			         	<PromoInsert />
			         	<LogoCard title="The Story">
			          { pile.story && <Editor editorState={this.getDraftEditorState('story')} readOnly/> }
			          </LogoCard>
			          <LogoCard title="Updates">
			          	...
			          </LogoCard>
			        </Grid>
			        <Grid className={cls.gridAside} item xs={4}>
			        	{/*<Stats full={true} />*/}
	              <ShareBar />
	              <Organizer />
	              <TshirtEnabledCallout />

	              <div>
	              	<Subheading>Want to create your own pigpile? Easily update your campaign & change themes. Try the demo!</Subheading>
	              </div>

			          
			          <ul>
		            {
		            	// donations.length ? this.getDonations(donations) : <li>no donations yet</li><hr/>
		            }
		          </ul>
			        </Grid>
			      </Grid>
	        </main>
	      </section>,
	      <MeetChesterSection key="meetChester" />
      ]
  	)
  }
}

// By default data will be accessible in the 'pile' prop.
// Pass a custom key to 'withSubscriptionToPile' if needed.
export default compose(
  withStyles(styles),
  withGetPile(),
  // withSubscriptionToPileDonations(),
)(Pile);
