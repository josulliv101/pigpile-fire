import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import {withStyles} from 'material-ui/styles'
//
import {Subheading} from '../Text'
import Content from './Content'
import ThemeForm from './ThemeForm'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  subheading: {
    background: theme.palette.primary[500],
    padding: `${theme.spacing.unit * .75}px ${theme.spacing.unit * 2}px`,
  },
  tabRoot: {
    minWidth: '25%',
  },
  tabsRoot: {
    background: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[400]}`,
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

class PileUpdate extends Component {

  state = {
  	enable: false,
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  }

  componentWillReceiveProps = (nextProps) => {
  	// Avoid rendering any content until user indicates interest in the drawer. 
  	// Also don't want content to disappear as soon as drawer shuts.
  	// Nicer if it remains while shutting.
  	if (!this.props.open && nextProps.open && !this.state.enable ) {
  		this.setState({enable: true})
  	}
  }

  render() {
    const {className, classes: cls, idParam, pile = {}} = this.props
    const {enable, value} = this.state
    console.log('drawer pileupdate', this.props)
    return (
      <div className={classNames(cls.root, className)}>
        <Subheading className={cls.subheading} contrast xlheavy>Edit Fundraiser</Subheading>
        <Tabs
          classes={{root: cls.tabsRoot}}
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab classes={{root: cls.tabRoot}} label="Content" />
          <Tab classes={{root: cls.tabRoot}} label="Theme" />
          <Tab classes={{root: cls.tabRoot}} label="Advanced" />
        </Tabs>
        {enable && value === 0 && pile.id && <Content {...pile} history={this.props.history} idParam={idParam} initialValues={{...pile, ...pile.location}} />}
        {enable && value === 1 && pile.id && <ThemeForm userLayout={pile.layout} activeThemeId={pile.theme} pileId={idParam} />}
        {
        	// {...pile} history={this.props.history}  idParam={idParam} initialValues={{...pile, ...pile.location}}
        }
      </div>
    )
  }
}

PileUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default compose(
  withStyles(styles),
  connect((state, {match: {params = {}} = {}}) => ({
  	idParam: params.id,
    pile: params.id && state.settings && state.settings[`pile-${params.id}`],
  })),
)(PileUpdate)
