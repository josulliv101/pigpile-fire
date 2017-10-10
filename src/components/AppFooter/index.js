import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Copyright from 'material-ui-icons/Copyright'
//
import Pigtail from '../../icons/Pigtail'
import {Body2, Subheading, Title} from '../Text'

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    margin: '0 auto',
    maxWidth: theme.layout.page.width,
    padding: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px`,
    '& a': {
      color: theme.palette.common.white,
      lineHeight: '1.6em',
      textDecoration: 'none',
    },
    '& h2': {
      fontSize: 16,
      marginBottom: theme.spacing.unit * 2,
      opacity: .8,
    },
    '& hr': {
      marginBottom: theme.spacing.unit * 2,
      opacity: .3,
    },
    '& ul': {
      marginBottom: theme.spacing.unit * 4,
      opacity: .7,
    },
  },
  blurb: {
    position: 'relative',
    top: -4,
  },
  brand: {
    ...theme.components.brand,
    alignItems: 'center',
    display: 'inline-flex',
    fontSize: 24,
    fontWeight: 300,
    opacity: .3,
    position: 'relative',
    top: -3,
    '&>*:first-child': {
      marginRight: theme.spacing.unit * 1,
    },
  },
  copyright: {
    marginLeft: 46,
    opacity: .7,
    '& svg': {
      height: 18,
      marginRight: theme.spacing.unit * 1/2,
      marginLeft: theme.spacing.unit * 2,
      opacity: .8,
      position: 'relative',
      top: 3,
      width: 18,
    },
  },
  full: {
    background: 'linear-gradient(to bottom, rgba(93,100,112,1) 0%,rgba(93,100,112,1) 100%)',
    minHeight: '90vh',
  },
})

function AppFooter(props) {
  const {className, classes: cls} = props
  return (
    <section className={cls.full}>
      <Grid align="flex-start" className={classNames(cls.root, className)} container spacing={0}>
        <Grid item xs={7}>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <Title gutterBottom uppercase xlheavy>Quick Links</Title>
              <ul>
                <li>
                  <Link to="/terms">Start a Fundraiser</Link>
                </li>
                <li>
                  <Link to="/terms">#swagg</Link>
                </li>
                <li>
                  <Link to="/privacy">Blog</Link>
                </li>
                <li>
                  <Link to="/legal">Mission</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <Title gutterBottom uppercase xlheavy>Social Media</Title>
              <ul>
                <li>
                  <Link to="/terms">Facebook</Link>
                </li>
                <li>
                  <Link to="/privacy">Twitter</Link>
                </li>
                <li>
                  <Link to="/legal">LinkedIn</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={4}>
              <Title gutterBottom uppercase xlheavy>Company</Title>
              <ul>
                <li>
                  <Link to="/terms">About</Link>
                </li>
                <li>
                  <Link to="/privacy">Pricing</Link>
                </li>
                <li>
                  <Link to="/legal">Other</Link>
                </li>
              </ul>
            </Grid>
          </Grid>
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
          <div className={cls.brand}>
            <Pigtail />
            pigpile
          </div>
        </Grid>
        <Grid item  xs={6}>
          <Body2 align="right" className={cls.copyright}>
            <Copyright />2017 Pigpile Corporation. All Rights Reserved.
          </Body2>
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
