import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
//
import withSubscriptionToTrending from '../../../hocs/withSubscriptionToTrending'

class Home extends PureComponent {

  render() {
    console.log('piles', this.props.piles)
    const piles = this.props.piles.map(p => <li key={p.id}><Link to={`/pile-${p.id}`}>{p.id}</Link></li>)
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
