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

const styles = (theme) => ({
  root: {
  	backgroundColor: 'rgba(0,0,0,.04)',
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class SelectList extends Component {

  handleChange = (id) => {
    console.log('list', id)
    const {input, multi} = this.props

    if (!multi) return input.onChange(id)

    // If multi, data persisted in shape `{foo: true, bar: true}`
    
    const update = Object.assign({}, input.value, {[id]: !input.value[id]})
    input.onChange(Object.keys(update).reduce((sum, key) => {
      if (update[key] === true) return Object.assign({}, sum, {[key]: true})
      return sum
    }, {}));
    
  }

  componentDidMount = () => {
  	const {input: {name} = {}} = this.props
  	// Give the editor a chance to affect persisting data by giving
  	// ability to set state on parent. For example, this good be a good
  	// place to have a prop that managed whether a persist was a 'merge' or 'replace'
  	console.log('Editor componentDidMount', this.props)
  	if (this.props.setParentState) {
  		this.props.setParentState({merge: this.props.merge})
  	}
  }

  componentWillUnmount = () => {
  	console.log('Editor componentWillUnmount', this.props)
  	if (this.props.setParentState) {
  		this.props.setParentState({merge: null})
  	}
  }


  render() {
    const {input, items = [], merge, multi, setParentState, ...props} = this.props
    console.log('SelectList', items, props, input)
    return (
      <List {...props}>
        {
          items.map(item => (
            <ListItem button divider key={item.id} onClick={this.handleChange.bind(this, item.id)}>
              <ListItemText primary={item.name} />
              {
                ((multi && input.value[item.id] === true) || input.value === item.id) && 
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

SelectList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  merge: PropTypes.bool,
  multi: PropTypes.bool,
}

SelectList.defaultProps = {
	merge: false,
	multi: false,
}

export default compose(
  withStyles(styles),
)(SelectList)
