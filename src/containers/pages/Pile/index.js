import React, {PureComponent} from 'react'
import compose from 'recompose/compose'
//
import withSubscriptionToPile from '../../../hocs/withSubscriptionToPile'
import withSubscriptionToPileDonations from '../../../hocs/withSubscriptionToPileDonations'

class Pile extends PureComponent {

  componentDidCatch(error, errorInfo) {
    console.log('ERROR CAUGHT', error, errorInfo)
  }

  getDonations = (items) => items.map((d, i) => <li key={i}>{d.name} / ${d.amount}</li>)

  render() {
    const {donations = [], match, pile = {}} = this.props;
    console.log('donations', donations)
    console.log('pile', pile)
  	return (
    	<main>
        <h1>Pile page here. {match.params.id}</h1>
        <h3>{pile.title}</h3>
        <hr/>
        <ul>
          {this.getDonations(donations)}
        </ul>
    	</main>
  	)
  }
}

// By default data will be accessible in the 'pile' prop.
// Pass a custom key to 'withSubscriptionToPile' if needed.
export default compose(
  withSubscriptionToPile(),
  withSubscriptionToPileDonations(),
)(Pile);
