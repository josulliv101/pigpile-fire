import withSubscription from './withSubscription'
import {update} from '../redux/modules/Pile'
import {subscribeToTrending as subscribe, unsubscribe} from '../redux/modules/Subscription'
import {subscribeToTrendingPiles} from '../../functions/db-firestore'

export default (key = 'trending') => withSubscription({
  subscription: subscribeToTrendingPiles,
  onSuccess,
  onError,
  mapStateToProps: state => ({
    [key]: state.pile && state.pile.trending,
  }),
  actions: {subscribe, unsubscribe, update},
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, snapshot) {
  console.log('args', props, snapshot)
  props.update('trending', snapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
