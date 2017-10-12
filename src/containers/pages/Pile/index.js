import React, {Component} from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {withStyles} from 'material-ui/styles'
//
import withSubscriptionToPile from '../../../hocs/withSubscriptionToPile'
import withSubscriptionToPileDonations from '../../../hocs/withSubscriptionToPileDonations'

const styles = (theme) => ({
  root: {

  },
  full: {
    background: theme.palette.common.white,
  },
})

class Pile extends Component {

  componentDidCatch(error, errorInfo) {
    console.log('ERROR CAUGHT', error, errorInfo)
  }

  getDonations = (items) => items.map((d, i) => <li key={i}>{d.name} / ${d.amount}</li>)

  render() {
    const {classes: cls, className, donations = [], match, pile = {}} = this.props;
    console.log('donations', donations)
    console.log('pile', pile)
  	return (
      <section className={classNames(cls.full)}>
        <main className={classNames(cls.root, className)}>
          <h1>Pile page here. {match.params.id}</h1>
          <h3>{pile.title}</h3>
          <hr/>
          <ul>
            {donations.length ? this.getDonations(donations) : <li>no donations yet</li>}
          </ul>
        </main>
      </section>
  	)
  }
}

// By default data will be accessible in the 'pile' prop.
// Pass a custom key to 'withSubscriptionToPile' if needed.
export default compose(
  withStyles(styles),
  withSubscriptionToPile(),
  withSubscriptionToPileDonations(),
)(Pile);
