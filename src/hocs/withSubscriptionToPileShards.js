import withSubscription from './withSubscription'
import {setting} from '../redux/modules/Settings'
import {subscribeToPileShards as subscribe, unsubscribe} from '../redux/modules/Subscription'
import {subscribeToPileShards} from '../../functions/db-firestore'

export default (key = 'shards') => withSubscription({
  actions: {subscribe, unsubscribe, setting},
  onError,
  onSuccess,
  mapStateToProps: (state, ownProps) => ({
    pid: ownProps.pileId,
    handleRequestClose: ownProps.handleRequestClose,
    [key]: state.settings && state.settings.shards,
  }),
  passedOnProps: props => ({pid: props.pid}),
  subscription: subscribeToPileShards,
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, snapshot) {
  console.log('shards!!!', props, snapshot)
  props.setting('shards', snapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
