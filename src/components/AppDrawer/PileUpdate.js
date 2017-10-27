import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Tabs, { Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import {withStyles} from 'material-ui/styles'
import Close from 'material-ui-icons/Close'
//
import {Subheading} from '../Text'
import ContentForm from './ContentForm'
import ThemeForm from './ThemeForm'
import {setting} from '../../redux/modules/Settings'

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
    background: theme.palette.primary[500],
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    color: theme.palette.common.white,
    height: 20,
    width: 20,
  },
  iconBtn: {
    backgroundColor: theme.palette.common.transparent,
    height: 36,
    width: 36,
  },
  subheading: {
    
    flex: 1,
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
    const {className, classes: cls, idParam, pile = {}, setting} = this.props
    const {enable, value} = this.state
    console.log('drawer pileupdate', this.props)
    return (
      <div className={classNames(cls.root, className)}>
      	<div className={cls.header}>
      		<Subheading className={cls.subheading} contrast xlheavy>Edit Fundraiser</Subheading>
          <IconButton
            className={cls.iconBtn}
            onClick={() => setting('drawer', false)}>
            <Close className={cls.icon} />
          </IconButton>
      	</div>
        
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
        {enable && value === 0 && pile.id && <ContentForm pileId={idParam} pile={pile} />}
        {enable && value === 1 && pile.id && <ThemeForm userLayout={pile.layout} activeThemeId={pile.theme} pileId={idParam} />}
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
  connect((state, {params = {}}) => ({
  	idParam: params.id,
    pile: params.id && state.settings && state.settings[`pile-${params.id}`],
  }), {setting}),
)(PileUpdate)
