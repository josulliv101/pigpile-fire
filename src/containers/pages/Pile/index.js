import React, {PureComponent} from 'react'

export default class Pile extends PureComponent {

  render() {
  	return (
    	<div>
        <h1>Pile page here. {this.props.match.params.id}</h1>
    	</div>
  	)
  }
}
