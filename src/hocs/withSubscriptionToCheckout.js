import withSubscription from './withSubscription'
import {setting} from '../redux/modules/Settings'
import {subscribeToCheckout as subscribe, unsubscribe} from '../redux/modules/Subscription'
import {subscribeToCheckout} from '../../functions/db-firestore'

export default (key = 'checkout') => withSubscription({
  actions: {subscribe, unsubscribe, setting},
  onError,
  onSuccess,
  mapStateToProps: (state) => ({
    id: state.auth && state.auth.uid,
    [key]: state.settings && state.settings.checkout,
  }),
  passedOnProps: props => ({id: props.id}),
  subscription: subscribeToCheckout,
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, doc) {
  console.log('SUBSCRIBETOPILE', props, doc.data())
  props.setting('checkout', doc.data())
}

function onError(e) {
  console.log('err', e)
}
