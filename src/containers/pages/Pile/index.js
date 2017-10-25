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
import Stats from '../../../components/Hero/HeroPile/Stats'
import PromoInsert from './PromoInsert'
import ShareBar from './ShareBar'
import Organizer from './Organizer'

const styles = (theme, {unit} = theme.spacing) => ({
  root: {
  	paddingTop: unit * 5,
  },
  full: {
    background: 'linear-gradient(to bottom, #fafafa 30%,#efefef 100%)',
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

  render() {
    const {classes: cls, className, donations = [], match, pile = {}} = this.props;
    console.log('getPile', this.props)
    console.log('pile', pile)

	  const rawStory = typeof pile.story === 'string' ? JSON.parse(pile.story) : pile.story
	  const contentState = pile.story && convertFromRaw(rawStory)
	  const editorState = pile.story && EditorState.createWithContent(contentState)


  	return (
      <section className={classNames(cls.full)}>
        <main className={classNames(cls.root, className)}>
		      <Grid container spacing={24}>
		      	<Grid className={cls.gridMain} item xs={8}>
		          <LogoCard title="Overview">
		          	{pile.overview}
		          </LogoCard>
		         	<PromoInsert />
		         	<LogoCard title="The Story">
		          {
		          	pile.story && 
		          	<Editor editorState={editorState} readOnly/>
		          }
		          </LogoCard>
		          <LogoCard title="Updates">
		          	...
		          </LogoCard>
		        </Grid>
		        <Grid className={cls.gridAside} item xs={4}>
		        	<Stats full={true} />
              <ShareBar />
              <Organizer />
		          <h1>Pile page here. {match.params.id}</h1>
		          <h3>{pile.title} (goal is ${pile.goal})</h3>
		          <hr/>
		          <ul>
	            {
	            	// donations.length ? this.getDonations(donations) : <li>no donations yet</li>
	            }
	          </ul>
		        </Grid>
		      </Grid>
        </main>
      </section>
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
