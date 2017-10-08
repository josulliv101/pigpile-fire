import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
// import Button from 'material-ui/Button'
// import firebase from 'firebase'

// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

import {addTrending} from '../../redux/modules/Piles'
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
    const {addTrending} = this.props;

/*    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    firebase
      .firestore()
      .collection("piles")
      .onSnapshot(function(snapshot) {
          console.log("componentDidMount snapshot: ", snapshot.size);
          // cb({employees: snapshot.docs.map(doc => doc.data()) })
          // addTrending({id: 'foo', title: 'foo bar'})
      }, function(e) {
        console.log('err', e)
      })*/
  }

  render() {
  	return (
    	<div>
    	  <header>
          {/*<Button>foo</Button><Button>bar</Button><Button>count {this.props.pilesCount}</Button>*/}
        </header>
    	  <main>my main content</main>
    	  <footer>Pigpile Corporation</footer>
    	</div>
  	)
  }
}
const mapStateToProps = state => ({pilesCount: state.piles && state.piles.trending && state.piles.trending.length || 0})
export default connect(mapStateToProps, {addTrending})(App)
