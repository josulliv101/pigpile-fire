import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
//

export default function withScrollBehavior() {
  return function(WrappedComponent) {
    class WithScrollBehaviorEnhanced extends Component {

      componentDidUpdate(prevProps) {
        const {location} = this.props
        if (location.pathname !== prevProps.location.pathname && window) {
          window.scrollTo(0, 0)
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
    return withRouter(WithScrollBehaviorEnhanced)
  }
}
