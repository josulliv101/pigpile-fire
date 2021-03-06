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

function getPayment({api, pid}) {

  if (!api || !pid) return
  console.log('getPayment', pid)
  return api
    .firestore()
    .collection("payment")
    .doc(pid)
    .get()
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
    	const themeId = pile.theme && pile.theme.id || 'wave-dark'
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

function getCheckout({api, pid, uid}) {

  if (!api || !pid || !uid) return

  return api
    .firestore()
    .collection("piles")
    .doc(pid)
    .collection("checkouts")
    .doc(uid)
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


const setCheckout = ({api, uid, pid, update = {}, options = {}}) => {

  if (!api || !uid || !pid) return;

  console.log('updateCheckout', api, uid, pid, update);

  return api
    .firestore()
    .collection("piles")
    .doc(pid)
    .collection("checkouts")
    .doc(uid)
    .set(update, options)
}

const addDonation = ({api, checkout_id, pid, update = {}}) => {

  console.log('addDonation...', checkout_id, pid, update);

  if (!api || !pid || !checkout_id || !update.amount) return;

  console.log('addDonation', checkout_id);

  const ref = api.firestore().collection("piles").doc(pid)

  // Add the donation
  const p1 = api
    .firestore()
    .collection("piles")
    .doc(pid)
    .collection("donations")
    .doc(String(checkout_id))
    .set(update)

  // Increase the shard totals
  // TODO Switch to all in same transaction
  const p2 = incrementShard(api.firestore(), ref, update.amount, 1)
  // const p3 = incrementShard(api.firestore(), ref, 'onpile', 1)
  return Promise.all([p1, p2])

}


function incrementShard(db, ref, amount, num_shards) {
    // Select a shard of the counter at random
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref1 = ref.collection('shards').doc(`${'donations'}-${shard_id}`);
    const shard_ref2 = ref.collection('shards').doc(`${'onpile'}-${shard_id}`);

    // Update count in a transaction
    return db.runTransaction(t => {

        const t1 = t.get(shard_ref1).then(doc => {
            const new_count = doc.data().value + amount;
            t.update(shard_ref1, { value: new_count });
        });

        const t2 = t.get(shard_ref2).then(doc => {
            const new_count = doc.data().value + 1;
            t.update(shard_ref2, { value: new_count });
        });

        return Promise.all([t1, t2])
    });
}

const subscribeToCheckout = ({api, pid, uid, onSuccess = noop, onError = noop}) => {

  if (!api || !pid ||  !uid) return;

  console.log('subscribeToCheckout', uid, pid, api);

  const unsubscribe = api
    .firestore()
    .collection("piles")
    .doc(pid)
    .collection("checkouts")
    .doc(uid)
    .onSnapshot(onSuccess, onError)

  return Promise.resolve(unsubscribe)
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

const subscribeToPileDonations = ({api, pid, limit = 5, onSuccess = noop, onError = noop}) => {

  if (!api) return;

  console.log('subscribeToPileDonations', pid, api);

  const unsubscribe = api
    .firestore()
    .collection("piles")
    .doc(pid)
    .collection("donations")
    .orderBy("createdAt")
    .limit(limit)
    .onSnapshot(onSuccess, onError)

  return Promise.resolve(unsubscribe)
}

const subscribeToPileShards = ({api, pid, onSuccess = noop, onError = noop}) => {

  if (!api || !pid) return;

  console.log('subscribeToPileShards', pid, api);

  const unsubscribe = api
    .firestore()
    .collection("piles")
    .doc(pid)
    .collection("shards")
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
  addDonation,
  getAllTags,
  getAllThemes,
  getCheckout,
  getPayment,
  getPile,
  getPileDonations,
  getPileWithTheme,
  getTheme,
  getTrending,
  setCheckout,
  subscribeToCheckout,
  subscribeToPile,
  subscribeToPileDonations,
  subscribeToPileShards,
  subscribeToTrendingPiles,
  updatePile,
}
