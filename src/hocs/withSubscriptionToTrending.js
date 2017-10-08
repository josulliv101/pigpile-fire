import withSubscription from './withSubscription'
import {update} from '../redux/modules/Pile'
import {subscribeToTrendingPiles} from '../../functions/db-firestore'

export default () => withSubscription(
  subscribeToTrendingPiles,
  onSuccess,
  onError,
  mapStateToProps,
  {update},
)

const mapStateToProps = state => ({
  piles: state.pile && state.pile.trending,
});

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, snapshot) {
  console.log('args', props, snapshot)
  props.update('trending', snapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
