import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//
import {update} from '../redux/modules/Pile'
import {subscribeToTrendingPiles} from '../../functions/db-firestore'

const mapStateToProps = state => ({
  piles: state.pile && state.pile.trending,
});

export default function withSubscriptionToTrending() {
  return function(WrappedComponent) {

    class Enhanced extends PureComponent {

      componentDidMount() {
        this.unsubscribe = subscribeToTrendingPiles(
          firebase, // global on client
          snapshot => this.props.update('trending', snapshot.docs.map(doc => doc.data())),
          e => console.log('err', e),
        )
      }

      componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
    return connect(mapStateToProps, {update})(Enhanced)
  }
}
