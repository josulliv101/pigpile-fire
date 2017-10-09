function getTrending(firebase) {

  if (!firebase) return

  return firebase
    .firestore()
    .collection("piles")
    .get()
}

function getPile(firebase, id) {

  if (!firebase || !id) return

  return firebase
    .firestore()
    .collection("piles")
    .doc(id)
    .get()
}


const subscribeToPile = ({firebase, id, onSuccess = noop, onError = noop}) => {

  if (!firebase || !id) return;

  return firebase
    .firestore()
    .collection("piles")
    .doc(id)
    .onSnapshot(onSuccess, onError)
}

const subscribeToPileDonations = ({firebase, id, onSuccess = noop, onError = noop}) => {

  if (!firebase) return;

  return firebase
    .firestore()
    .collection("piles")
    .doc(id)
    .collection("donations")
    .onSnapshot(onSuccess, onError)
}

const subscribeToTrendingPiles = ({firebase, onSuccess = noop, onError = noop}) => {

  if (!firebase) return;

  return firebase
    .firestore()
    .collection("piles")
    .onSnapshot(onSuccess, onError)
}

function noop () {}

module.exports = {
  getPile,
  getTrending,
  subscribeToPile,
  subscribeToPileDonations,
  subscribeToTrendingPiles,
}
