import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Field} from 'redux-form'
import compose from 'recompose/compose'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {withStyles} from 'material-ui/styles'
import Check from 'material-ui-icons/CheckCircle';
//
// import InputField from './InputField'
import withGetAllTags from '../hocs/withGetAllTags'

const styles = (theme) => ({
  root: {
  	backgroundColor: 'rgba(0,0,0,.04)',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

const tags = [
	{id: 'autism', name: 'Autism'},
	{id: 'animal', name: 'Animal'},
	{id: 'cancer', name: 'Cancer'},
	{id: 'memorial', name: 'Memorial'},
]

class Tags extends Component {

	handleClick = (id) => {
		console.log('id', id, this.props)
	}

  render() {
  	const {classes: cls, className, tagsAll} = this.props;
    return (
	    <Field 
      	name="tags" 
      	className={classNames(cls.root)}
      	component={TagField} 
        tags={tagsAll}
        // onChange={() => console.log('select')}
      />
    )
  }
}

class TagField extends Component {

  handleChange = (id) => {
    const {input} = this.props
    const update = Object.assign({}, input.value, {[id]: !input.value[id]})
    input.onChange(Object.keys(update).reduce((sum, key) => {
      if (update[key] === true) return Object.assign({}, sum, {[key]: true})
      return sum
    }, {}));
  }

  render() {
    const {input, tags = [], ...props} = this.props
    console.log('TagField', props, input)
    return (
      <List {...props}>
        {
          tags.map(tag => (
            <ListItem button divider key={tag.id} onClick={this.handleChange.bind(this, tag.id)}>
              <ListItemText primary={tag.name} />
              {
                input.value[tag.id] === true && 
                <ListItemIcon>
                  <Check style={{marginRight: 0}} />
                </ListItemIcon>
              }

            </ListItem>
          ))        
        }
      </List>
    )    
  }
}

Tags.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  withGetAllTags(),
)(Tags)
