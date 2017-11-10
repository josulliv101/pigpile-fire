import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Tooltip from 'material-ui/Tooltip'
import Collapse from 'material-ui/transitions/Collapse'

import Dots from 'material-ui-icons/MoreVert'
import Filter from 'material-ui-icons/FilterList'
import Settings from 'material-ui-icons/Settings'
import ChevronLeft from 'material-ui-icons/ChevronLeft'
import ChevronRight from 'material-ui-icons/ChevronRight'
import Close from 'material-ui-icons/Close'
import SwapVert from 'material-ui-icons/SwapVert'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
//


const styles = (theme) => ({
  root: {
    background: theme.palette.common.white,
    // marginBottom: space * 2,
  },
  avatar: {
    fontSize: 18,
    height: 36,
    width: 36,
    '& svg': {
      height: 18,
      // position: 'relative',
      // top: 2,
      width: 18,
    },
  },
  container: {

  },
  controls: {
    background: theme.palette.grey[100],
    display: 'block',
    maxHeight: '100%',
    opacity: 1,
    overflow: 'hidden',
    position: 'relative',
    transition: theme.transitions.create(['max-height']),
    zIndex: 9,
    '&$hide': {
      maxHeight: 0,
      zIndex: 8,
      '&$swap': {
        // maxHeight: '100%',
        // transition: 'none',
      },
    },
    '&$swap': {
      // maxHeight: '100%',
      transition: 'none',
    },
  },
  dense: {
    lineHeight: '18px',
  },
  grow: {
    flex: '1 0 auto',
  },
  hide: {

    // display: 'none',
    opacity: 1,
  },
  swap: {},
  tshirt: {
    background: theme.palette.common.white,
    color: theme.palette.grey[400],
    position: 'relative',
    right: 4,
    top: 8,
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
    controlIcon: {
      height: 36,
      width: 36,
    },
  },
})

/*
const donations = [
  {name: 'Joe Bird', amount: 5, tshirt: true },
  {name: 'Thomas Whitemoore', amount: 50, tshirt: true },
  {name: 'Helen Smith', amount: 20, tshirt: false },
  {name: 'Emma Davis', amount: 20, tshirt: true },
  {name: 'Jarod Jacobs', amount: 10, tshirt: false },
]
*/

class LatestDonations extends PureComponent {

  state = {
    isSwap: false,
    showFilters: false,
    showMore: false,
    activeFilter: 'all',
  }

  handleToggleFilters = () => {

    if (!this.state.showFilters) {
      // Other one is shut, no issue
      if (!this.state.showMore) this.setState({showMore: false, showFilters: true, isSwap: this.state.showMore })
      // shut other first
      else {
        this.handleToggleMore()
        setTimeout(this.handleToggleFilters, 350)
      }
    } else {
      this.setState({showMore: false, showFilters: false, isSwap: false})
    }

  }

  handleToggleMore = () => {

    if (!this.state.showMore) {
      // Other one is shut, no issue
      if (!this.state.showFilters) this.setState({showMore: true, showFilters: false, isSwap: this.state.showFilters })
      // shut other first
      else {
        this.handleToggleFilters()
        setTimeout(this.handleToggleMore, 350)
      }
    } else {
      this.setState({showMore: false, showFilters: false, isSwap: false})
    }

  }

  handleToggle = (val) => {
    this.setState({activeFilter: val, showFilters: false})
  }

  render() {
    const { classes: cls, className, donations = []} = this.props
    return (
      <Paper
        className={classNames(cls.root, className)}
        elevation={1}
      >
        <List subheader={
          <ListItem>
            <ListItemText
              // classes={{textDense: cls.dense}}
              primary="Latest Donations"
              secondary={<span>Results 1-5 of 875 / <a href="#" style={{textDecoration: 'none', color: '#999'}} onClick={(e) => e.preventDefault() || this.handleToggleMore()}>next</a></span>}
              // secondary={this.state.activeFilter === 'all' ? 'Donations, sharing & comments.' : this.state.activeFilter}
            />
            <ListItemSecondaryAction>
              <Tooltip id="tooltip-icon-filter" title={this.state.showFilters ? 'Close' : 'Filters'} placement="top">
                <IconButton className={cls.controlIcon}  aria-label="1" onClick={this.handleToggleFilters}>
                  {!this.state.showFilters ? <SwapVert /> : <Close />}
                </IconButton>
              </Tooltip>
              <Tooltip id="tooltip-icon-more" title={this.state.showMore ? 'Close' : 'More'} placement="top">
                <IconButton  className={cls.controlIcon}  aria-label="Filter" onClick={this.handleToggleMore}>
                  {!this.state.showMore ? <Dots /> : <Close />}
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        }>
          <Divider />
          <div className={cls.container}>
            <Collapse in={this.state.showFilters || this.state.showMore} transitionDuration="auto" >

              { // more content
                <div className={classNames(cls.controls, {[cls.hide]: !this.state.showMore }, {[cls.swap]: this.state.isSwap})}>
                  <Tooltip id="tooltip-icon2" title="Left" placement="bottom">
                    <IconButton aria-label="2">
                      <ChevronLeft />
                    </IconButton>
                  </Tooltip>
                  <Tooltip id="tooltip-icon3" title="Right" placement="bottom">
                    <IconButton aria-label="3">
                      <ChevronRight />
                    </IconButton>
                  </Tooltip>

                  <Tooltip id="tooltip-icon4" title="Settings" placement="bottom">
                    <IconButton aria-label="4">
                      <Settings />
                    </IconButton>
                  </Tooltip>
                </div>
              }
              { // filters content
                <div className={classNames(cls.controls, {[cls.hide]: !this.state.showFilters }, {[cls.swap]: this.state.isSwap})}>
                  <Tooltip id="tooltip-icon45" title="Foo" placement="top">
                    <IconButton aria-label="2">
                      <ExpandMore />
                    </IconButton>
                  </Tooltip>
                  <Tooltip id="tooltip-icon56" title="Bar" placement="top">
                    <IconButton aria-label="3">
                      <ExpandLess />
                    </IconButton>
                  </Tooltip>
                  <div>lorem ipsum</div>
                </div>
              }

              <Divider />
            </Collapse>
          </div>
          {
            donations.length === 0 &&
              <ListItem key={'first'}>
                <ListItemText
                  primary={'Be the first to donate.'}
                />
              </ListItem>
          }
          {

            donations.map((donation, i) => (
              <ListItem key={i}>
                <Avatar alt={donation.uid} className={cls.avatar}>
                  {donation.uid[0]}
                </Avatar>
                <ListItemText
                  // classes={{textDense: cls.dense}}
                  primary={'foo bar'}
                  secondary={`$${donation.amount}`}
                />
              </ListItem>
            ))
          }


        </List>

      </Paper>
    )
  }
}

LatestDonations.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LatestDonations)
