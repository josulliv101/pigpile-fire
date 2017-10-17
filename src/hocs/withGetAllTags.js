import withGet from './withGet'
import {setting} from '../redux/modules/Settings'
import {getAllTags as getOnce} from '../redux/modules/Get'
import {getAllTags} from '../../functions/db-firestore'

export default (key = 'tagsAll') => withGet({
  actions: {getOnce, setting},
  onError,
  onSuccess,
  mapStateToProps: (state) => ({
    [key]: state.settings && state.settings.tagsAll || [],
    key: 'foo',
  }),
  getting: getAllTags,
  
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, querySnapshot) {
  console.log('!@#!@# onSuccess', props, querySnapshot)
  props.setting('tagsAll', querySnapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
