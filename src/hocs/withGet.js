import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export default function withGet({getting, onSuccess = noop, onError = noop, mapStateToProps, actions = {}, passedOnProps = noop, idRequired = false}) {

  return function(WrappedComponent) {

    class Enhanced extends PureComponent {

      componentDidMount() {
      	console.log('withGet componentDidMount', this.props)

      	if (this.props.loaded === true) return

      	if (idRequired && !this.props.id) return 

        this.props.getOnce({
          getting,
          onSuccess: onSuccess.bind(this, this.props),
          onError,
          ...passedOnProps(this.props),
        });
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return connect(mapStateToProps, actions)(Enhanced)
  }
}

function noop() {}
