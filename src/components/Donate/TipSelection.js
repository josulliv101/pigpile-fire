import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import numeral from 'numeral'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { fade } from 'material-ui/styles/colorManipulator'
import { FormControl } from 'material-ui/Form'
import Select from 'material-ui/Select'
//

const styles = (theme) => ({
  root: {
    backgroundColor: fade(theme.palette.grey[600], 0.08),
    display: 'flex',
    // paddingLeft: theme.spacing.unit * 2,
    // paddingRight: theme.spacing.unit * 2,
  },
  cancelCustomTip: {
    background: theme.palette.grey[600],
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.grey[600], 0.88),
    },
  },
  customInput: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    '&>div:first-child': {
      backgroundColor: fade(theme.palette.common.white, .88),
      flex: 1,
    },
  },
  formControl: {
    width: '100%',
  },
  menuitem: {
    color: theme.palette.common.white,
    fontWeight: 500,
    height: 40,
    padding: theme.spacing.unit * 1,
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.06),
    },
  },
  select: {
    fontSize: 14,
    fontWeight: 300,
    paddingLeft: theme.spacing.unit * 1,
  },
  selectMenu: {
    backgroundColor: theme.palette.primary[500],
    borderRadius: '32px',
    '&>ul:first-child': {
      display: 'flex',
      paddingBottom: 0,
      paddingLeft: theme.spacing.unit * 1,
      paddingRight: theme.spacing.unit * 1,
      paddingTop: 0,
    },
  },
  [theme.breakpoints.up(948)]: {
    root: {

    },
  },
})

const options = [.10, .15, .20, .25]

class TipSelection extends PureComponent {

  handleCustomTipInputChange = (event) => {
    this.props.change('customTipAmount', numeral(event.target.value).value())
  }

  handleCancelCustomTip = () => {
    this.props.change('showCustomTip', false)
    this.props.change('customTipAmount', null)
  }

  render() {
    const { amount = 0, classes: cls, handleChange, showCustomTip, tip } = this.props

    console.log('TipSelection', this.props)
    // {amount}...{this.state.percent}
    const money = numeral(amount * tip).format('$0,0[.]00')
    const perc = numeral(amount > 0 ? tip : 0).format('%0')
    return (
      <div className={classNames(cls.root)}>

        <FormControl className={cls.formControl}>
          {false && <InputLabel htmlFor="tip-custom">Enter Tip Amount (in $USD)</InputLabel>}
          {showCustomTip &&
            <div className={classNames(cls.customInput)}>
              <Input onChange={this.handleCustomTipInputChange} type="number" id="tip-custom" placeholder="Enter Tip Amount (in $USD)" />
              <Button className={cls.cancelCustomTip} color="contrast" dense onClick={this.handleCancelCustomTip}>cancel</Button>
            </div>
          }
          {
            !showCustomTip &&
            <Select
              input={<Input id="tip-simple" />}
              className={cls.select}
              MenuProps={{
                classes: {root: cls.selectMenu},
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                transformOrigin: {
                  vertical: 'center',
                  horizontal: 'center',
                }
              }}
              onChange={handleChange}
              renderValue={() => `Thank you for a ${money} tip (${perc}).`}
              value={tip}
            >
              {options.map((val) => <MenuItem key={val} classes={{root: cls.menuitem}} value={val}>{numeral(val).format('%0')}</MenuItem>)}
              <MenuItem key="other" classes={{root: cls.menuitem}} value={-1}>custom</MenuItem>
            </Select>
          }

        </FormControl>
      </div>
    )
  }
}

TipSelection.propTypes = {
  amount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  tip: PropTypes.number,
}

TipSelection.defaultProps = {
  amount: 0,
}

export default withStyles(styles)(TipSelection)
