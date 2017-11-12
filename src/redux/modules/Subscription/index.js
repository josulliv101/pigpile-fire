import { createAction, handleActions } from 'redux-actions'

// Rather than a generic subscription action, each will have its own unique action.
// This is useful in development -- easily see which subscription actions are fired off.

export const subscribeToCheckout = createAction('@pigpile/SUBSCRIBE_CHECKOUT')
export const subscribeToPile = createAction('@pigpile/SUBSCRIBE_PILE')
export const subscribeToPileDonations = createAction('@pigpile/SUBSCRIBE_PILE_DONATIONS')
export const subscribeToPileShards = createAction('@pigpile/SUBSCRIBE_PILE_SHARDS')
export const subscribeToTrending = createAction('@pigpile/SUBSCRIBE_TRENDING')

export const unsubscribe = createAction('@pigpile/UNSUBSCRIBE')

// Helpful to have exports grouped as arrays in saga
export const subscribes = [
  subscribeToCheckout,
  subscribeToPile,
  subscribeToPileDonations,
  subscribeToPileShards,
  subscribeToTrending,
];

