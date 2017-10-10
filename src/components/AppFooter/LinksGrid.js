import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
//
import {Title} from '../Text'

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
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
    '& ul': {
      marginBottom: theme.spacing.unit * 4,
      opacity: .7,
    },
  },
})

function LinksGrid(props) {
  const {className, classes: cls, ...rest} = props
  return (
    <Grid className={classNames(cls.root, className)} container {...rest}>
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
  )
}

LinksGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(LinksGrid)
