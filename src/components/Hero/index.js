import React, {Component} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
//
import HeroHome from './HeroHome'
import HeroPile from './HeroPile'
import PileHeroImage from './PileHeroImage'

class Hero extends Component {
  render() {
  	return (
      <Switch>
        <Route path="/login" render={() => null} />
        <Route path="/" exact render={() => <HeroHome />} />
        <Route path='/:id' render={({match: {params: {id}}}) => <HeroPile pileId={id} />} />
      </Switch>
  	)
  }
}

Hero.propTypes = {};

export default Hero
