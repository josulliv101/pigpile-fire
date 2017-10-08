import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//

export default function withSubscription(subscription, onSuccess = noop, onError = noop, mapStateToProps, actions = {}) {

  return function(WrappedComponent) {

    class Enhanced extends PureComponent {

      componentDidMount() {
        this.unsubscribe = subscription(
          firebase, // global on client
          onSuccess.bind(this, this.props),
          onError,
        )
      }

      componentWillUnmount() {
        console.log('attempt unsubscribe to Trending');
        if (this.unsubscribe) this.unsubscribe();
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return connect(mapStateToProps, actions)(Enhanced)
  }
}

function noop() {}
