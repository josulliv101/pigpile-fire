import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
//
import {Body2, Subheading, Title} from '../Text'
import LinksGrid from './LinksGrid'
import Brand from './Brand'
import Copyright from './Copyright'

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    margin: '0 auto',
    maxWidth: theme.layout.page.width,
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px`,
    '& hr': {
      marginBottom: theme.spacing.unit * 2,
      opacity: .3,
    },
  },
  blurb: {
    position: 'relative',
    top: -4,
  },
  full: {
    background: theme.components.footer.bg,
    minHeight: '90vh',
  },
})

function AppFooter(props) {
  const {className, classes: cls} = props
  return (
    <section className={cls.full}>
      <Grid align="flex-start" className={classNames(cls.root, className)} container spacing={0}>
        <Grid item xs={7}>
          <LinksGrid spacing={24} />
        </Grid>
        <Grid item xs={5}>
          <Subheading className={cls.blurb} gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Subheading>
        </Grid>
        <Grid item xs={12}>
          <hr/>
        </Grid>
        <Grid item xs={6}>
          <Brand />
        </Grid>
        <Grid item  xs={6}>
          <Copyright />
        </Grid>
      </Grid>

    </section>
  )
}

AppFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(AppFooter)
