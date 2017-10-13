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

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  bd: {
    padding: theme.spacing.unit * 2,
  },
  subheading: {
    background: theme.palette.primary[500],
    padding: `${theme.spacing.unit * .75}px ${theme.spacing.unit * 2}px`,
  },
  tabRoot: {
    minWidth: '33.33%',
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
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const {className, classes: cls, pile = {}} = this.props
    console.log('drawer pileupdate', this.props)
    return (
      <div className={classNames(cls.root, className)}>
        <Subheading className={cls.subheading} contrast xlheavy>Fundraiser Content, Theming & More</Subheading>
        <Tabs
          classes={{root: cls.tabsRoot}}
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab classes={{root: cls.tabRoot}} label="Content" />
          <Tab classes={{root: cls.tabRoot}} label="Theming" />
          <Tab classes={{root: cls.tabRoot}} label="Advanced" />
        </Tabs>
        <div className={classNames(cls.bd)}>
          <TextField
            id="title"
            label="Title"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Placeholder"
            helperText="Keep it short and to the point (example 'Help Joe Fight Cancer')"
            fullWidth
            margin="normal"
            value={pile.title}
          />
          <TextField
            id="organizer"
            label="Organizer"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Placeholder"
            helperText="Help text goes here."
            fullWidth
            margin="normal"
            value={pile.organizer}
          />

          <TextField
            id="beneficiary"
            label="Beneficiary"
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rowsMax="4"
            placeholder="Placeholder"
            helperText="Help text goes here."
            fullWidth
            margin="normal"
            value={pile.beneficiary}
          />

          <TextField
            id="overview"
            label="Overview"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Placeholder"
            helperText="Help text goes here."
            fullWidth
            margin="normal"
            value={pile.overview}
          />

          <TextField
            id="goal"
            label="Goal"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Placeholder"
            helperText="Help text goes here."
            fullWidth
            margin="normal"
            value={pile.goal}
          />

        </div>
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
  connect((state, {match: {params: {id}}}) => ({
    pile: state.pile[`pile-${id}`],
  })),
)(PileUpdate)
