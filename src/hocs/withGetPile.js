import withGet from './withGet'
import {setting} from '../redux/modules/Settings'
import {setTheme} from '../redux/modules/Theme'
import {getPile as getOnce} from '../redux/modules/Get'
import {getPileWithTheme as getPile} from '../../functions/db-firestore'

export default (key = 'pile') => withGet({
  actions: {getOnce, setTheme, setting},
  onError,
  onSuccess,
  mapStateToProps: (state, {match}) => ({
  	id: match && match.params && match.params.id,
    [key]: state.settings && state.settings[`pile-${match && match.params && match.params.id}`] || {},
    loaded: state.settings && !!state.settings[`pile-${match && match.params && match.params.id}`],
  }),
  getting: getPile,
  passedOnProps: props => ({id: props.id}),
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, doc) {
  console.log('!@#!@# onSuccess', props, doc)
  props.setTheme(doc.themeObj)
  props.setting(`pile-${props.id}`, doc)

}

function onError(e) {
  console.log('err', e)
}
