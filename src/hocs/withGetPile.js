import withGet from './withGet'
import {setting} from '../redux/modules/Settings'
import {getPile as getOnce} from '../redux/modules/Get'
import {getPile} from '../../functions/db-firestore'

export default (key = 'pile') => withGet({
  actions: {getOnce, setting},
  onError,
  onSuccess,
  mapStateToProps: (state, {match}) => ({
  	id: match && match.params && match.params.id,
    [key]: state.settings && state.settings[`pile-${match && match.params && match.params.id}`] || {},
  }),
  getting: getPile,
  passedOnProps: props => ({id: props.id}),
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, doc) {
  console.log('!@#!@# onSuccess', props, doc.data())
  props.setting(`pile-${props.id}`, doc && doc.data())
}

function onError(e) {
  console.log('err', e)
}
