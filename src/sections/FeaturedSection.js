import React, {PureComponent} from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
//
import withSubscriptionToTrending from '../hocs/withSubscriptionToTrending'
import FeatureCard from '../components/FeatureCard'
import {Title} from '../components/Text'

const styles = (theme) => ({
  root: {
    background: theme.palette.grey[200],
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})


class FeaturedSection extends PureComponent {

  getCards = piles => piles.map(pile => (
    <Grid key={pile.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
      <FeatureCard {...pile} />
    </Grid>
  ))

  render() {
    const {classes: cls, className, trending = [], ...props} = this.props;
  	return (
      <section className={classNames(cls.root, className)}>
        <main>
          <Title gutterBottomLg>Trending</Title>
          <Grid container>
            {this.getCards(trending)}
          </Grid>
        </main>
      </section>
  	)
  }
}

export default compose(
  withStyles(styles),
  withSubscriptionToTrending(),
)(FeaturedSection);
