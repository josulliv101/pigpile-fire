import React, {Component} from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
import {Editor, EditorState, convertFromRaw} from 'draft-js'
import DraftEditorContents from 'draft-js/lib/DraftEditorContents.react'
import DefaultDraftBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap'
//
import withSubscriptionToPile from '../../../hocs/withSubscriptionToPile'
import withSubscriptionToPileDonations from '../../../hocs/withSubscriptionToPileDonations'
// import Editor from '../../../forms/Editor'

const styles = (theme) => ({
  root: {

  },
  full: {
    background: theme.palette.common.white,
  },
})

class Pile extends Component {

  componentDidCatch(error, errorInfo) {
    console.log('ERROR CAUGHT', error, errorInfo)
  }

  getDonations = (items) => items.map((d, i) => <li key={i}>{d.name} / ${d.amount}</li>)

  render() {
    const {classes: cls, className, donations = [], match, pile = {}} = this.props;
    console.log('donations', donations)
    console.log('pile', pile)

	  const rawStory = typeof pile.story === 'string' ? JSON.parse(pile.story) : pile.story
	  const contentState = pile.story && convertFromRaw(rawStory)
	  const editorState = pile.story && EditorState.createWithContent(contentState)


  	return (
      <section className={classNames(cls.full)}>
        <main className={classNames(cls.root, className)}>
          <h1>Pile page here. {match.params.id}</h1>
          <h3>{pile.title} (goal is ${pile.goal})</h3>
          {
          	pile.story && 
          	<Editor 
          		editorState={editorState} 
          		readOnly
          	/>
          }
          <hr/>
          <ul>
            {donations.length ? this.getDonations(donations) : <li>no donations yet</li>}
          </ul>
        </main>
      </section>
  	)
  }
}

// By default data will be accessible in the 'pile' prop.
// Pass a custom key to 'withSubscriptionToPile' if needed.
export default compose(
  withStyles(styles),
  withSubscriptionToPile(),
  withSubscriptionToPileDonations(),
)(Pile);
