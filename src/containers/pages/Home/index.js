import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
//
import withSubscriptionToTrending from '../../../hocs/withSubscriptionToTrending'

class Home extends PureComponent {

  getPiles = piles => piles.map(p => <li key={p.id}><Link to={`/pile-${p.id}`}>{p.id}</Link></li>)

  render() {
    const {piles = []} = this.props
    console.log('piles', this.props.piles)
  	return (
    	<div>
        <h1>This is the homepage.</h1>
        <ul>
          {this.getPiles(piles)}
        </ul>
    	</div>
  	)
  }
}

export default withSubscriptionToTrending()(Home)
