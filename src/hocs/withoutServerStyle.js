import React, { Component } from 'react'

export default function withoutServerStyle(id = 'jss-server-side') { // TODO move default to config
  return function(WrappedComponent) {
    return class WithoutServerStyleEnhanced extends Component {

      componentDidMount() {
        // Cleanup styles included by server
        const jssStyles = document.getElementById(id)
        if (jssStyles && jssStyles.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles)
        }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
