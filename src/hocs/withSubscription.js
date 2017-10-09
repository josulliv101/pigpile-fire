import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export default function withSubscription({subscription, onSuccess = noop, onError = noop, mapStateToProps, actions = {}, passedOnProps = noop}) {

  // const actionsForDispatch = Object.assign({}, {subscribe}, actions);

  return function(WrappedComponent) {

    class Enhanced extends PureComponent {

      componentDidMount() {
        this.props.subscribe({
          instance: this,
          subscription,
          onSuccess: onSuccess.bind(this, this.props),
          onError,
          ...passedOnProps(this.props),
        });
      }

      componentWillUnmount() {
        console.log('attempt unsubscribe');
        // Unsubscribe created in the subscribe action
        if (this.unsubscribe) {

          this.unsubscribe();

          // Just so a record appears in the actions log
          this.props.unsubscribe({type: subscription && subscription.name})
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return connect(mapStateToProps, actions)(Enhanced)
  }
}

function noop() {}
