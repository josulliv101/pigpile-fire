import React, { Component } from 'react'
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth'
//

export default function withStickyNav() {
  return function(WrappedComponent) {

    class WithStickyNavEnhanced extends Component {

      state = {
        navDocked: false,
        stickyEnabled: null,
      }

      handleStickyNavChange = ({status}) =>  {
        this.setState({navDocked: status > 0})
      }

      componentWillReceiveProps(nextProps) {
        console.log('sticky', nextProps.width)
        // Involves scrolling behavior so only matters on client.
        this.setState({stickyEnabled: isWidthUp('md', nextProps.width, true)})
      }

      render() {
        console.log('stickyEnabled', this.state.stickyEnabled)
        console.log('width in render sticky', this.props.width)
        return (
          <WrappedComponent
            {...this.props}
            {...this.state}
            handleStickyNavChange={this.handleStickyNavChange}
          />
        )
      }
    }
    return withWidth()(WithStickyNavEnhanced)
  }
}
