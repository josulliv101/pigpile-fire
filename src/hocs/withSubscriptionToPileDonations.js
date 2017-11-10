import withSubscription from './withSubscription'
import {update} from '../redux/modules/Pile'
import {subscribeToPileDonations as subscribe, unsubscribe} from '../redux/modules/Subscription'
import {subscribeToPileDonations} from '../../functions/db-firestore'

export default (key = 'donations') => withSubscription({
  actions: {subscribe, unsubscribe, update},
  onError,
  onSuccess,
  mapStateToProps: (state, {match}) => ({
    pid: match && match.params && match.params.id,
    [key]: state.pile && state.pile[`pile-${match && match.params && match.params.id}-donations`],
  }),
  passedOnProps: props => ({pid: props.pid}),
  subscription: subscribeToPileDonations,
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, snapshot) {
  console.log('donations!!!', props, snapshot)
  props.update(`pile-${props.pid}-donations`, snapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
