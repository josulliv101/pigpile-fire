import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
//
import withSubscriptionToTrending from '../../../hocs/withSubscriptionToTrending'

class Home extends PureComponent {

  getPiles = piles => piles.map(p => <li key={p.id}><Link to={`/${p.id}`}>{p.id}</Link></li>)

  render() {
    const {trending = []} = this.props
    console.log('trending', this.props.trending)
  	return (
    	<div>
        <h1>This is the homepage.</h1>
        <ul>
          {this.getPiles(trending)}
        </ul>
    	</div>
  	)
  }
}

export default withSubscriptionToTrending()(Home)
