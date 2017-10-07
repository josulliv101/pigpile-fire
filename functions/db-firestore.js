function getTrending(firebase) {

  if (!firebase) return

  return firebase
    .firestore()
    .collection("piles")
    .get()
}

module.exports = {
  getTrending
}
