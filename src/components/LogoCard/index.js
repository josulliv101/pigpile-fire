import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
//
import Pigtail from '../../icons/Pigtail'
import {Title} from '../Text'

const styles = (theme, {unit} = theme.spacing, {primary, common: {white}} = theme.palette, {up, values} = theme.breakpoints) => ({
  root: {
    padding: `${unit * 5}px ${unit * 4}px ${unit * 5}px`,
    '&>aside': {
    	textAlign: 'center',
    },
  },
  content: {
    fontSize: 18,
    fontWeight: 300,
    lineHeight: '26px',
    marginBottom: theme.spacing.unit * 3,
  },
  logo: {
    color: theme.palette.grey[400],
    marginBottom: theme.spacing.unit * 1/2,
    textAlign: 'center',
		height: 36,
		width: 36,
  },
  title: {
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit * 3.5,
  },
  [up(values.md)]: {
    root: {},
  },
});

class LogoCard extends Component {

  render() {
    const {children, classes: cls, title} = this.props;

  	return (
      <Paper className={classNames(cls.root)} elevation={1}>
      	<aside> 
	      	<Pigtail className={cls.logo} />
	      	<Title className={cls.title} align="center" gutterBottom heavy lowercase>{title}</Title>
	      </aside>
	      <div className={cls.content}>
	        {children}
	      </div>
      </Paper>
  	)
  }
}

LogoCard.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

LogoCard.defaultProps = {

};

export default withStyles(styles)(LogoCard)
