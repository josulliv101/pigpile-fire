import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
//
import {Body1, Body2, Caption, Subheading, Title, Display1} from '../Text'
import LinksGrid from './LinksGrid'
import CategoryGrid from './CategoryGrid'
import Brand from './Brand'
import Copyright from './Copyright'
import Pigtail from '../../icons/Pigtail'

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    margin: '0 auto',
    maxWidth: theme.layout.page.width,
    padding: `${theme.spacing.unit * 6}px 0`,
    '& hr': {
      marginBottom: theme.spacing.unit * 3,
      opacity: .3,
      '&$first': {
        marginBottom: theme.spacing.unit * 6,
      },
      '&$last': {
        marginTop: theme.spacing.unit * 0,
        marginBottom: theme.spacing.unit * 3,
        '&$last2': {
          margin: theme.spacing.unit * 0,
        },
      },
    },
  },
  blank: {
    marginBottom: theme.spacing.unit * 1,
    opacity: .6,
  },
  blurb: {
    marginBottom: theme.spacing.unit * 2,
    position: 'relative',
    top: -4,
  },
  caption: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1,
    opacity: .6,
  },
  chester: {
    background: 'rgb(158, 162, 169)',
    border: '10px rgb(104, 111, 122) solid',
    borderRadius: '50%',
    height: 240,
    margin: `0 auto ${theme.spacing.unit * 6}px`,
    position: 'relative',
    width: 240,
    '&>div:first-child': {
      backgroundImage: `url(${theme.components.img.chester})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      height: 136,
      opacity: .9,
      position: 'relative',
      transform: 'translate(40%,30%)',
      width: 136,
      zIndex: 2,
    },
    '&>div:last-child': {
      color: theme.palette.common.black,
      height: 220,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 220,
      zIndex: 1,
      '&>svg': {
        height: '100%',
        opacity: .1,
        width: '100%',
      },
    },
  },
  first: {},
  full: {
    background: theme.components.footer.bg,
    minHeight: '90vh',
    position: 'relative',
    zIndex: 1,
  },
  last: {},
  last2: {},
  tagline: {
    fontSize: 17.5,
    marginBottom: theme.spacing.unit * 4,
    opacity: .6,
  },
  title: {
    marginBottom: theme.spacing.unit * 2,
    opacity: .6,
  },
  bekind: {
    background: 'rgba(255, 255, 255, 0.07)',
    color: theme.palette.common.lightWhite,
    fontSize: 28,
    marginBottom: theme.spacing.unit * 2,
    padding: 64,
  },
})

function AppFooter(props) {
  const {className, classes: cls} = props
  return (
    <section className={cls.full}>
      <Grid align="flex-start" className={classNames(cls.root, className)} container spacing={0}>

        <Grid item xs={8}>
          <Title className={cls.title} heavy>Pigpile's the trusted source in online fundraising.</Title>
          <Subheading className={cls.blurb}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Subheading>
          <Subheading className={cls.blurb}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Subheading>
          <Subheading className={cls.blurb}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Subheading>
        </Grid>
        <Grid item xs={4}>
          {/*<Title align="center" className={cls.tagline} xlheavy>
            Pigpile's the trusted source in online fundraising.
          </Title>*/}
          <div className={cls.chester}>
            <div/>
            <div><Pigtail /></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <hr className={cls.last}/>
        </Grid>
        <Grid item xs={12}>
          <Display1 align="center" heavy className={cls.bekind}>Be kind. Pigpile on good causes.</Display1>
        </Grid>
        <Grid item xs={12}>
          <hr className={cls.first}/>
        </Grid>
        <Grid item xs={8}>
          <LinksGrid spacing={24} />
          <CategoryGrid spacing={24} />
        </Grid>
        <Grid item xs={4}>
          <Subheading className={cls.blurb}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Subheading>
          <br/>
          <Subheading className={cls.blurb}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Subheading>
          <br/>
        </Grid>

        <Grid item xs={12}>
          <hr className={cls.last, cls.last2}/>
        </Grid>
        <Grid item xs={12}>
          <Body1 className={cls.blank}>
          </Body1>
        </Grid>
        <Grid item xs={7}>
          <Brand />
        </Grid>
        <Grid item  xs={5}>
          <Copyright />
        </Grid>
        <Grid item xs={12}>
          <Body1 className={cls.caption}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
          </Body1>
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
