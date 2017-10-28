import React, {Component} from 'react'

export default function delaySubscriptionUntilOpen(Subscription) {

	return function(WrappedComponent) {

		const Base = WrappedComponent
		const BaseWithSubscription = Subscription()(WrappedComponent)

		class DelaySubscriptionEnhanced extends Component {

		  state = {
		  	enable: false,
		  };

		  componentWillReceiveProps = (nextProps) => {
		  	// Avoid rendering any content until user indicates interest in the drawer. 
		  	// Also don't want content to disappear as soon as drawer shuts.
		  	// Nicer if it remains while shutting.
		  	if (!this.props.open && nextProps.open && !this.state.enable ) {
		  		this.setState({enable: true})
		  	}
		  }

			render() {
				// debugger
				if (this.state.enable === true) {
					return <BaseWithSubscription {...this.props} />
				}
				return null
			}
		}
		return DelaySubscriptionEnhanced
	}
}