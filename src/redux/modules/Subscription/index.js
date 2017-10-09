import { createAction, handleActions } from 'redux-actions'

// Rather than a generic subscription action, each will have its own unique action.
// This is useful in development -- easily see which subscription actions are fired off.

export const subscribeToPile = createAction('@pigpile/SUBSCRIBE_PILE')
export const subscribeToPileDonations = createAction('@pigpile/SUBSCRIBE_PILE_DONATIONS')
export const subscribeToTrending = createAction('@pigpile/SUBSCRIBE_TRENDING')

export const unsubscribe = createAction('@pigpile/UNSUBSCRIBE')

// Helpful to have exports grouped as arrays in saga
export const subscribes = [
  subscribeToPile,
  subscribeToPileDonations,
  subscribeToTrending,
];

