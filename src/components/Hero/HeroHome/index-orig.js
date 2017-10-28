import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
//

const styles = (theme, {up, values} = theme.breakpoints) => ({
  root: {
    height: '100vh',
  },
  [up(values.md)]: {
    root: {
      height: theme.components.hero.height,
    },
  },
});

class HeroHome extends PureComponent {

  render() {
    const {classes: cls, className} = this.props;
  	return (
      <section className={classNames(cls.root, className)}>
        hero home
      </section>
  	)
  }
}

HeroHome.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(HeroHome)
