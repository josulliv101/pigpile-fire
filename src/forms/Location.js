import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Field} from 'redux-form'
import compose from 'recompose/compose'
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import {withStyles} from 'material-ui/styles'
//
import InputField from './InputField'

const styles = (theme) => ({
  root: {
  	// display: 'flex',
  },
  city: {
  	// width: `calc(40% - ${theme.spacing.unit * 2}px)`,
  	// flex: '1 0 calc(59% - 32px)',
  },
  country: {
  	// flex: '1 0 100%',
  	// width: `calc(20% - ${theme.spacing.unit * 2}px)`,
  },
  field: {
  	flex: '1 0 100%',
  	// marginRight: theme.spacing.unit * 2,
  	'&:last-child': {
  		marinRight: 0,
  	},
  },
  state: {
  	// flex: '1 0 16%',
  	// width: `calc(20% - ${theme.spacing.unit * 2}px)`,
  },
  zip: {
  	// flex: '1 0 22%',
  	// width: `calc(20% - ${theme.spacing.unit * 2}px)`,
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class Location extends Component {

  render() {
  	const {classes: cls, className} = this.props;
    return (
    	<div>
    		<div className={classNames(cls.root, className)}>
		      <Field 
		      	name="city" 
		      	className={classNames(cls.field, cls.city)}
		      	component={InputField} 
		      	label="City"
		      	margin="normal"
		      	fullWidth
		      />
		      <Field 
		      	name="state" 
		      	className={classNames(cls.field, cls.state)}
		      	component={InputField} 
		      	label="State"
		      	select
		        onChange={() => console.log('select')}
		        margin="normal"
		        fullWidth
		      >
			      {['Al', 'ID', 'MA', 'NY'].map(option => (
			        <MenuItem key={option} value={option}>
			          {option}
			        </MenuItem>
			      ))}
		      </Field>
		      <Field 
		      	name="postal" 
		      	className={classNames(cls.field, cls.zip)}
		      	component={InputField} 
		      	label="Zip"
		      	margin="normal"
		      	fullWidth
		      />
		      <Field 
		      	name="country" 
		      	className={classNames(cls.field, cls.country)}
		      	component={InputField} 
		      	label="Country"
		      	select
		        onChange={() => console.log('select')}
		        margin="normal"
		        fullWidth
		      >
			      {['United States', 'Canada', 'Mexico'].map(option => (
			        <MenuItem key={option} value={option}>
			          {option}
			        </MenuItem>
			      ))}
		      </Field>
	      </div>
    	</div>
    )
  }
}

Location.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
)(Location)
