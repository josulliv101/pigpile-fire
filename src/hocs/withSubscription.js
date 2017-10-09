import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//

export default function withSubscription({
  subscription,
  onSuccess = noop,
  onError = noop,
  mapStateToProps,
  actions = {},
  passedOnProps = noop,
}) {

  return function(WrappedComponent) {

    class Enhanced extends PureComponent {

      componentDidMount() {

        const selectedProps = passedOnProps(this.props);

        this.unsubscribe = subscription({
          firebase, // global on client
          onSuccess: onSuccess.bind(this, this.props),
          onError,
          ...selectedProps,
        })
      }

      componentWillUnmount() {
        console.log('attempt unsubscribe');
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
