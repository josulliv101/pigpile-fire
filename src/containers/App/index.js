import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
// import firebase from 'firebase'

// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

import {addTrending, unwatchTrendingPiles, update, watchTrendingPiles} from '../../redux/modules/Pile'
/*const config = {
    "apiKey": "AIzaSyDAv9TI_H1JcGX0LqdL_hQLtgDbmpCNDUg",
    "databaseURL": "https://pigpile-next.firebaseio.com",
    "storageBucket": "pigpile-next.appspot.com",
    "authDomain": "pigpile-next.firebaseapp.com",
    "messagingSenderId": "565862273054",
    "projectId": "pigpile-next"
};*/

class App extends PureComponent {

  componentDidMount() {
    const {update} = this.props;
    // this.props.watchTrendingPiles()
    if (!firebase) return

    firebase
      .firestore()
      .collection("piles")
      .onSnapshot(function(snapshot) {
          console.log("componentDidMount snapshot: ", snapshot.size);
          // cb({employees: snapshot.docs.map(doc => doc.data()) })
          const data = snapshot.docs.map(doc => doc.data());
          update('trending', data);
      }, function(e) {
        console.log('err', e)
      })
  }

  componentWillUnmount() {
    // this.props.unwatchTrendingPiles()
  }

  render() {
  	return (
    	<div>
    	  <header>
          <Button>foo</Button>
          <Button>bar</Button>
          <Button>count {this.props.pilesCount}</Button>
        </header>
    	  <main>my main content</main>
    	  <footer>Pigpile Corporation</footer>
    	</div>
  	)
  }
}
const mapStateToProps = state => ({pilesCount: state.pile && state.pile.trending && state.pile.trending.length || 0})
export default connect(mapStateToProps, {addTrending, unwatchTrendingPiles, update, watchTrendingPiles})(App)
