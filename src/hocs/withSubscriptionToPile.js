import withSubscription from './withSubscription'
import {setting} from '../redux/modules/Settings'
import {subscribeToPile as subscribe, unsubscribe} from '../redux/modules/Subscription'
import {subscribeToPile} from '../../functions/db-firestore'

export default (key = 'pile') => withSubscription({
  actions: {subscribe, unsubscribe, setting},
  onError,
  onSuccess,
  mapStateToProps: (state, {match}) => ({
    id: match && match.params && match.params.id,
    [key]: state.settings && state.settings[`pile-${match && match.params && match.params.id}`],
  }),
  passedOnProps: props => ({id: props.id}),
  subscription: subscribeToPile,
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, doc) {
  console.log('SUBSCRIBETOPILE', props, doc.data())
  props.setting(`pile-${props.id}`, doc.data())
}

function onError(e) {
  console.log('err', e)
}
