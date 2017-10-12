import React, {PureComponent} from 'react'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {Link} from 'react-router-dom'
import Grid from 'material-ui/Grid'
import {withStyles} from 'material-ui/styles'
//
import {Display1} from '../components/Text'

const styles = (theme) => ({
  root: {
    background: theme.components.footer.bg,
    color: theme.palette.common.white,
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  bekind: {
    background: 'rgba(255, 255, 255, 0.07)',
    color: theme.palette.common.lightWhite,
    fontSize: 28,
    padding: theme.spacing.unit * 8,
  },
  [theme.breakpoints.up(748)]: {

  },
  [theme.breakpoints.up(948)]: {

  },
})


class MeetChesterSection extends PureComponent {

  render() {
    const {classes: cls, className} = this.props;
  	return (
      <section className={classNames(cls.root, className)}>
        <main>
          <Grid container>
            <Grid item xs={12}>
              <Display1 align="center" heavy className={cls.bekind}>Be kind. Pigpile on good causes.</Display1>
            </Grid>
          </Grid>
        </main>
      </section>
  	)
  }
}

export default compose(
  withStyles(styles),
)(MeetChesterSection);
