import React, {PureComponent} from 'react'
//
import withSubscriptionToTrending from '../../../hocs/withSubscriptionToTrending'

class Home extends PureComponent {

  render() {
    const piles = this.props.piles.map(p => <li key={p.id}>{p.id}</li>)
  	return (
    	<div>
        <h1>This is the homepage.</h1>
        <ul>
          {piles}
        </ul>
    	</div>
  	)
  }
}

export default withSubscriptionToTrending()(Home)
