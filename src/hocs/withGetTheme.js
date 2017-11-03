import withGet from './withGet'
import {setTheme} from '../redux/modules/Theme'
import {getTheme as getOnce} from '../redux/modules/Get'
import {getTheme} from '../../functions/db-firestore'

export default (key = 'theme') => withGet({
  actions: {getOnce, setTheme},
  onError,
  onSuccess,
  mapStateToProps: (state, {match}) => ({
    [key]: state.theme && state.theme.active,
    // Kill if pile data not loaded yet
    //loaded: state.settings && !state.settings[`pile-${match && match.params && match.params.id}`]
  }),
  idRequired: true,
  getting: getTheme,
  passedOnProps: props => ({id: props.pile && props.pile.theme}),
})

// Avoid arrow-function here to avoid auto binding for 'this'
function onSuccess(props, doc) {
  console.log('!@#!@# getTheme onSuccess', props, doc.data())
  if (doc) props.setTheme(doc.data())
}

function onError(e) {
  console.log('err', e)
}
