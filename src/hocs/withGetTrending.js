import withGet from './withGet'
import {setting} from '../redux/modules/Settings'
import {getTrending as getOnce} from '../redux/modules/Get'
import {getTrending} from '../../functions/db-firestore'

export default (key = 'trending') => withGet({
  actions: {getOnce, setting},
  onError,
  onSuccess,
  mapStateToProps: (state) => ({
    [key]: state.settings && state.settings.trending || [],
    loaded: state.settings && state.settings.trending !== undefined && state.settings.trending !== null,
  }),
  getting: getTrending,
  // passedOnProps: props => ({id: props.id}),
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, snapshot) {
  console.log('!@#!@# onSuccess', props, snapshot)
  props.setting('trending', snapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
