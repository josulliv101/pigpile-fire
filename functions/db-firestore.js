function getAllTags({api}) {

  if (!api) return

  return api
    .firestore()
    .collection("meta-tags")
    .get()
}

function getAllThemes({api}) {

  if (!api) return

  return api
    .firestore()
    .collection("themes")
    .get()
}

function getTrending({api}) {

  if (!api) return

  return api
    .firestore()
    .collection("piles")
    .get()
}

function getTheme({api, id}) {

  if (!api || !id) return

  return api
    .firestore()
    .collection("themes")
    .doc(id)
    .get()
    .then(doc => doc.data())
}

function getPile({api, id}) {

  if (!api || !id) return

  return api
    .firestore()
    .collection("piles")
    .doc(id)
    .get()
}

function getPileWithTheme({api, id}) {

  if (!api || !id) return

  return api
    .firestore()
    .collection("piles")
    .doc(id)
    .get()
    .then(doc => {
    	const pile = doc.data()
    	const themeId = pile.theme || 'wave-dark'
    	return getTheme({api, id: themeId}).then(themeDoc => Object.assign({}, pile, {themeObj: themeDoc}))
    })
}

function getPileDonations(firebase, id) {

  if (!firebase || !id) return

  return firebase
    .firestore()
    .collection("piles")
    .doc(id)
    .collection("donations")
    .get()
}


const updatePile = (api, id, update = {}) => {

  if (!api || !id) return;

  console.log('updatePile', api, id, update);

  return api
    .firestore()
    .collection("piles")
    .doc(id)
    .update(update)
    .then(() => getPileWithTheme({api, id}))
}

const subscribeToPile = ({api, id, onSuccess = noop, onError = noop}) => {

  if (!api || !id) return;

  console.log('subscribeToPile', id, api);

  const unsubscribe = api
    .firestore()
    .collection("piles")
    .doc(id)
    .onSnapshot(onSuccess, onError)

  return Promise.resolve(unsubscribe)
}

const subscribeToPileDonations = ({api, id, onSuccess = noop, onError = noop}) => {

  if (!api) return;

  console.log('subscribeToPileDonations', id, api);

  const unsubscribe = api
    .firestore()
    .collection("piles")
    .doc(id)
    .collection("donations")
    .onSnapshot(onSuccess, onError)

  return Promise.resolve(unsubscribe)
}

const subscribeToTrendingPiles = ({api, onSuccess = noop, onError = noop}) => {

  if (!api) return;

  console.log('subscribeToTrendingPiles', api);

  const unsubscribe = api
    .firestore()
    .collection("piles")
    .onSnapshot(onSuccess, onError)

  return Promise.resolve(unsubscribe)
}

function noop () {}

module.exports = {
  getAllTags,
  getAllThemes,
  getPile,
  getPileDonations,
  getPileWithTheme,
  getTheme,
  getTrending,
  subscribeToPile,
  subscribeToPileDonations,
  subscribeToTrendingPiles,
  updatePile,
}
