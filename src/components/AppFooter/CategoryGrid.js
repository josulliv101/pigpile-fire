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

function CategoryGrid(props) {
  const {className, classes: cls, ...rest} = props
  return (
    <Grid className={classNames(cls.root, className)} container {...rest}>
      <Grid item xs={4}>
        <Title gutterBottom uppercase xlheavy>Categories A</Title>
        <ul>
          <li>
            <Link to="/terms">Animals</Link>
          </li>
          <li>
            <Link to="/terms">Autism</Link>
          </li>
          <li>
            <Link to="/privacy">Cancer</Link>
          </li>
          <li>
            <Link to="/legal">Natural Disaster</Link>
          </li>
        </ul>
      </Grid>
      <Grid item xs={4}>
        <Title gutterBottom uppercase xlheavy>Categories B</Title>
        <ul>
          <li>
            <Link to="/terms">Memorial</Link>
          </li>
          <li>
            <Link to="/privacy">Pet Surgery</Link>
          </li>
          <li>
            <Link to="/legal">Hospital</Link>
          </li>
        </ul>
      </Grid>
      <Grid item xs={4}>
        <Title gutterBottom uppercase xlheavy>Categories C</Title>
        <ul>
          <li>
            <Link to="/terms">Charity</Link>
          </li>
          <li>
            <Link to="/privacy">Church</Link>
          </li>
          <li>
            <Link to="/legal">5k</Link>
          </li>
        </ul>
      </Grid>
    </Grid>
  )
}

CategoryGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default withStyles(styles)(CategoryGrid)
