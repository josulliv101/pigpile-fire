import withSubscription from './withSubscription'
import {update} from '../redux/modules/Pile'
import {subscribeToPile as subscribe, unsubscribe} from '../redux/modules/Subscription'
import {subscribeToPile} from '../../functions/db-firestore'

export default (key = 'pile') => withSubscription({
  actions: {subscribe, unsubscribe, update},
  onError,
  onSuccess,
  mapStateToProps: (state, {match}) => ({
    id: match && match.params && match.params.id,
    [key]: state.pile && state.pile[`pile-${match && match.params && match.params.id}`],
  }),
  passedOnProps: props => ({id: props.id}),
  subscription: subscribeToPile,
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, doc) {
  console.log('args', props, doc.data())
  props.update(`pile-${props.id}`, doc.data())
}

function onError(e) {
  console.log('err', e)
}
