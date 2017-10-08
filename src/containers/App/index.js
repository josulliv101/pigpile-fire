import React, {Component} from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
//
import Home from '../pages/Home'
import Pile from '../pages/Pile'

class App extends Component {

  render() {
  	return (
    	<div>
    	  <nav>
          <Link to="/">foo</Link>
          <Link to="/pile">pile</Link>
        </nav>
        {/*<Button>count {this.props.pilesCount}</Button>*/}
    	  <main>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/pile' component={Pile} />
          </Switch>
        </main>
    	  <footer>Pigpile Corporation</footer>
    	</div>
  	)
  }
}

export default withStyles()(App)
