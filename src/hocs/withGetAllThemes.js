import withGet from './withGet'
import {setting} from '../redux/modules/Settings'
import {getAllThemes as getOnce} from '../redux/modules/Get'
import {getAllThemes} from '../../functions/db-firestore'

export default (key = 'themesAll') => withGet({
  actions: {getOnce, setting},
  onError,
  onSuccess,
  mapStateToProps: (state) => ({
    [key]: state.settings && state.settings.themesAll || [],
  }),
  getting: getAllThemes,
  
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, querySnapshot) {
  console.log('getAllThemes onSuccess', props, querySnapshot)
  props.setting('themesAll', querySnapshot.docs.map(doc => doc.data()))
}

function onError(e) {
  console.log('err', e)
}
