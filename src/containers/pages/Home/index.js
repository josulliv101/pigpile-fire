import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
//
import FeaturedSection from './FeaturedSection'

const styles = (theme) => ({
  root: {
    marginTop: theme.components.hero.height,
  },
})

class Home extends PureComponent {

  render() {
    const {classes: cls, className} = this.props;
  	return (
    	<div className={classNames(cls.root, className)}>
        <FeaturedSection />
    	</div>
  	)
  }
}

export default withStyles(styles)(Home)
