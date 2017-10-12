import React, {PureComponent} from 'react'
import classNames from 'classnames'
import {withStyles} from 'material-ui/styles'
//
import FeaturedSection from '../../../sections/FeaturedSection'
import MeetChesterSection from '../../../sections/MeetChester'
import BeKind from '../../../sections/BeKind'

const styles = (theme) => ({
  root: {
    background: theme.palette.common.white,
  },
})

class Home extends PureComponent {

  render() {
    const {classes: cls, className} = this.props;
  	return (
    	<div className={classNames(cls.root, className)}>
        <FeaturedSection />
        <BeKind />
        <MeetChesterSection />
    	</div>
  	)
  }
}

export default withStyles(styles)(Home)
