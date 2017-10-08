function getTrending(firebase) {

  if (!firebase) return

  return firebase
    .firestore()
    .collection("piles")
    .get()
}

const subscribeToTrendingPiles = (firebase, onSuccess = noop, onError = noop) => {

  if (!firebase) return;

  return firebase
    .firestore()
    .collection("piles")
    .onSnapshot(onSuccess, onError)
}

function noop () {}

module.exports = {
  getTrending,
  subscribeToTrendingPiles,
}
