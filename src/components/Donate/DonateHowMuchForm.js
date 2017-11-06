import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Field, getFormValues, reduxForm } from 'redux-form'
import compose from 'recompose/compose'
import numeral from 'numeral'
import { withStyles } from 'material-ui/styles'
import Hidden from 'material-ui/Hidden'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Text from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import InfoIcon from 'material-ui-icons/Info'
import { fade } from 'material-ui/styles/colorManipulator'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import CheckIcon from 'material-ui-icons/CheckCircle'
//
import validate from '../../validation/donationAmount'
import TipSelection from '../../pages/Pile/TipSelection'

import tshirtImg from '../../pages/Pile/tshirt.png'
import CheckboxField from './CheckboxField'
import Pigtail from '../icons/Pigtail'

import Tiger from '../../pages/Pile/tiger.png'
import Lion from '../../pages/Pile/lion.png'
import Monkey from '../../pages/Pile/monkey.png'
import Giraffe from '../../pages/Pile/giraffe.png'
// import Deer from '../../pages/Pile/deer.png'
import Panda from '../../pages/Pile/panda.png'
import Racoon from '../../pages/Pile/racoon.png'
import {px} from '../../style/globalStyle'
import {Subheading} from '../Text'
import Tshirt from '../icons/Tshirt'

const FORM_NAME = 'donate-how-much'
const green = '#7CD69F'

const styles = (theme, space = theme.spacing.unit, {common: {lightBlack, white}, grey, accent, primary} = theme.palette) => ({
  root: {
    background: 'linear-gradient(to bottom, rgb(227, 227, 227) 0%,rgb(253, 253, 253) 100%)', // theme.palette.background.default,
    height: '100%',
    left: 0,
    paddingTop: space * 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
  active: {},
  btn: {
    background: grey[600],
    // color: theme.palette.common.white,
    fontSize: 18,
    marginBottom: space * 1,
    position: 'relative',
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(grey[600], 0.88),
    },
    '&$active': {
      background: grey[600],
      // color: theme.palette.common.white,
      '& $icon': {
        opacity: 1,
      },
    },
  },
  btnAccent: {
    color: lightBlack,
  },
  btnAmount: {
    background: grey[100],
    display: 'inline-block',
    minWidth: 93,
    padding: px(space, 1, 2),
    position: 'relative',
    '&$btnAccent': {
      background: grey[600],
      color: white,
      '&:hover': {
        textDecoration: 'none',
        backgroundColor: fade(grey[600], 0.88),
      },
      '& $icon': {
        opacity: 1,
      },
    },
  },
  btnGroup: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    // height: 124,
    justifyContent: 'space-around',
    // padding: `${space * 1}px ${space * 2}px 0`,
  },
  btnGroupPaper: {
    marginBottom: space * 2,
    padding: px(space, 2, 2, 0),
  },
  btnShowMore: {
    fontWeight: 400,
    minWidth: 116,
    marginBottom: space * 1,
  },
  checkbox: {
    height: 20,
    marginRight: space * 1,
    marginTop: 2,
    width: 20,
  },
  checkboxRoot: {
    color: white,
    height: 20,
    marginRight: space * 1,
    width: 20,
    '& svg': {
      height: 20,
      width: 20,
    },
  },
  checked: {
    color: white,
    height: 20,
    width: 20,
  },
  confirm: {
    display: 'flex',
    margin: '0 auto',
    opacity: 0, // .4,
    transition: theme.transitions.create(['opacity']),
    '&$valid': {
      opacity: 1,
    },
  },
  custom: {
    display: 'block',
    fontWeight: 400,
    margin: `0 auto ${space * 1}px`,
  },
  divide: {
    display: 'none',
    margin: `${space * 2}px ${space * 2}px`,
  },
  fav: {
    bottom: 25,
    color: accent[700],
    height: 32,
    left: 'calc(50% - 16px)',
    position: 'absolute',
    width: 32,
    '&$logo': {
      color: grey[400],
      height: 32,
      left: 'calc(50% - 18px)',
      width: 32,
    },
  },
  formLabel: {
    color: white,
  },
  formLabelRoot: {
    marginLeft: 0,
    marginRight: 0,
  },
  grow: {
    flex: 1,
    marginBottom: space * .5,
  },
  hide: {
    opacity: 0,
  },
  icon: {
    background: white,
    // border: '1px transparent solid',
    borderRadius: 24,
    color: green, // theme.palette.common.white,
    height: 12,
    right: 0,
    opacity: 0,
    position: 'absolute',
    top: -6,
    transition: theme.transitions.create(['opacity']),
    width: 12,
  },
  info: {
    color: white,
    opacity: .8,
    position: 'absolute',
    right: space * 1,
    top: space * 1,
    transition: theme.transitions.create(['opacity']),
    zIndex: 9,
    '&:hover': {
      opacity: 1,
    },
  },
  itemText: {
    // color: theme.palette.common.white,
    fontSize: 24,
    fontWeight: 300,
  },
  logo: {},

  promo: {
    backgroundColor: grey[400],
    height: 160,
    overflow: 'hidden',
    position: 'relative',
    '& img': {
      // borderRadius: 24,
      position: 'relative',
      top: '-64%',
      transform: 'scale(1, 1)',
    },
  },
  promoText: {
    background: 'rgba(117, 117, 117, 0.78)',
    bottom: 0,
    color: white,
    display: 'flex',
    left: 0,
    padding: space * 1,
    position: 'absolute',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      // background: 'rgba(117, 117, 117, 0.78)',
    },
  },
  promoTextPosition: {
    // color: white,
    marginLeft: space * 2,
    marginTop: space * 2,
    width: '53%',
  },
  promoSubtitle: {
    fontWeight: 300,
    // lineHeight: '18px',
  },
  promoTitle: {
    fontWeight: 400,
    marginBottom: space * 1,
  },

  row: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    // padding: space * 1,
  },
  svg: {
    height: 16,
    transform: 'scale(1.2, 1.2)',
    width: 16,
  },
  thanks: {
    bottom: space * 1.25,
    color: grey[200],
    display: 'flex',
    justifyContent: 'space-between',
    left: 'calc(50%)',
    position: 'absolute',
    transform: 'translateX(-50%)',
    // width: 132,
    '& aside': {
      fontSize: 12,
      fontWeight: 300,
    }
  },
  tshirt: {
    width: '100%',
  },
  tshirtIcon: {
    // color: grey[600],
    height: 54,
    width: 54,
    '& svg': {
      height: 30,
      position: 'relative',
      top: 1,
      width: 30,
    }
  },
  tshirtTitle: {
    alignItems: 'center',
    display: 'flex',
    '&>:first-child': {
      marginRight: space * 2,
    },
  },
  tip: {
    flex: '1 0 auto',
    paddingRight: space * 2,
    width: '50%',
  },
  tipBlurb: {
    fontWeight: 300,
    paddingLeft: space * 2,
  },

  tipTitle: {
    fontWeight: 400,
    marginBottom: space * 2,
  },
  total: {
    display: 'flex',
    // justifyContent: 'space-between',
    padding: `${space * 2}px 0`,
    '&>*': {
      // fontWeight: 500,
      '&:first-child': {
        marginRight: space * 2,
      },
    },
  },
  valid: {},
  [theme.breakpoints.up(708)]: {
    root: {
      padding: px(space, 2, 3, 3),
    },
    boxTip: {
      backgroundColor: fade(primary[100], .32),
      border: px(1, 1, 'solid', primary[100]),
      display: 'flex',
      marginBottom: space * 2,
      padding: space * 2,
    },
    btn: {
      minHeight: space * 7 + 5,
      width: '32.5%',
      '&$more': {
        fontSize: 16,
        minHeight: space * 5 + 2,
        width: '16%',
        display: 'block',
        fontWeight: 400,
        margin: `0 auto ${space * .5}px`,
      },
    },
    btnGroup: {
      justifyContent: 'space-between',
    },
    more: {},
    promo: {
      backgroundColor: fade(grey[400], .3),
      border: px(1, 1, 'solid', grey[400]),
      display: 'inline-block',
      justifyContent: 'space-between',
      width: '100%',
      '&>img': {
        borderRadius: '50%',
        border: `${space*2}px ${fade(primary[100], .32)} solid`,
        position: 'absolute',
        right: '-14%',
        top: '-54%',
        transform: 'scale(1.1, 1.1)',
        width: '54%',
        zIndex: 9,
      },
    },
    promoText: {
      backgroundColor: grey[600],
    },
    total: {
      fontWeight: 400,
      padding: px(space, 1, 0, 0),
    },
    tshirt: {
      right: 0,
      top: 0,
      transform: 'scale(.55, .55)',
    },
  },
  [theme.breakpoints.up(948)]: {

  },
})

const data = [
  {amount: 10},
  {amount: 20},
  {amount: 50},
  {amount: 100, hidden: {xsDown: true}},
  {amount: 500, hidden: {xsDown: true}},
  {amount: 1000, hidden: {xsDown: true}},
]

const moreData = [
  {amount: 5},
  {amount: 30},
  {amount: 40},
  {amount: 75, hidden: {xsDown: true}},
  {amount: 200, hidden: {xsDown: true}},
  {amount: 300, hidden: {xsDown: true}},
  {amount: 400},
  {amount: 35},
  {amount: 750},
  {amount: 150, hidden: {xsDown: true}},
  {amount: 15, hidden: {xsDown: true}},
  {amount: 25, hidden: {xsDown: true}},
]

const WHY_TIP_SMALL = 'We rely 100% on donor tips.'
const WHY_TIP_BLURB = 'Pigpile is a FREE service provided to people in need of raising funds. We rely 100% on donor tips to operate our site. A tip of any size is appreciated.'
// const WHY_TIP = 'Pigpile is FREE for fundraisers. We rely 100% on donor tips to operate our site.'


class HowMuchForm extends PureComponent {

  state = {
    amountSelected: false,
    moreBtns: false,
  }

  handleClick = (amount) => {
    const {change} = this.props

    console.log('click', amount, this.props)
    // this.setState({amountSelected: true})

    change('amount', amount)
  }

  handleConfirm = () => {
    const {isValid, nextStep} = this.props
    if (isValid) nextStep()
  }

  handleTipChange = event => {
    const {change} = this.props

    if (!event) return
    const tip = numeral(event.target && event.target.value).value()

    // 'Other' was selected
    if (tip === -1) return change('showCustomTip', true)

    change('tip', tip)
  }

  render() {
    const { amount: amountProp, change, classes: cls, customTipAmount, handleSubmit, isValid, showCustomTip, tip = .15 } = this.props
    const {moreBtns} = this.state
    let grandTotal = 0

    // If in custom tip mode, use that value even if null
    if (showCustomTip) {
      grandTotal = amountProp + numeral(customTipAmount).value()
    }

    // Use tip percent
    else {
      grandTotal = amountProp + (amountProp * tip)
    }

    console.log('amountProp', amountProp, this.props)

    // The case where a value found in more btns is selected, but then user switches back to less display.
    const accentSelectedAmount = moreData.some(item => item.amount == amountProp) && !moreBtns
    // component={Link} to={{pathname: `/pile-${pid}/donate/details`, state: {donateDialog: true}}}


    const items = data.concat(moreBtns ? moreData : []).sort((a, b) => a.amount - b.amount).map(({amount, hidden = {}}, index) => (
      <Hidden key={index} {...hidden}>
        <Button
          className={classNames(cls.btn,
            {[cls.active]: amount === amountProp},
            {[cls.more]: moreBtns})
          }
          color="contrast"
          onClick={this.handleClick.bind(this, amount)}
        >
          <div className={classNames(cls.icon)}>
            <CheckIcon className={classNames(cls.svg)} />
          </div>
          ${numeral(amount).format('0,0')}
        </Button>
      </Hidden>
    ))

    return (
      <div className={cls.root}>
        <form onSubmit={ handleSubmit } autoComplete="off">
          <Paper className={classNames(cls.btnGroupPaper)} elevation={1}>
            <div className={classNames(cls.btnGroup)}>{items}</div>
            <div className={cls.row}>

              <div className={classNames(cls.grow)}>
                <Text align="center" color="inherit" className={classNames(cls.btnAmount, {[cls.hide]: !amountProp}, {[cls.btnAccent]: accentSelectedAmount})} type="subheading">
                  Ok, ${numeral(amountProp).format('0,0')}.
                  { accentSelectedAmount &&
                    <div className={classNames(cls.icon)}>
                      <CheckIcon className={classNames(cls.svg)} />
                    </div>
                  }

                </Text>
              </div>

              <Button className={classNames(cls.btnShowMore)} dense onClick={() => this.setState({moreBtns: !this.state.moreBtns})}>
                {!moreBtns ? 'more' : 'less'} options
              </Button>
              <Button
                className={classNames(cls.custom)}
                dense
                // onClick={this.handleConfirm}
              >
                Custom Amount
              </Button>

            </div>
          </Paper>
          <Divider className={cls.divide} />
          <div className={cls.boxTip}>
            <div className={cls.tip}>
              <Text className={cls.tipTitle} type="subheading">{WHY_TIP_SMALL}</Text>
              <TipSelection
                amount={amountProp}
                change={change}
                handleChange={this.handleTipChange}
                showCustomTip={showCustomTip}
                tip={tip}
              />
            </div>
            <Text className={cls.tipBlurb} type="body1">{WHY_TIP_BLURB}</Text>
          </div>
          <Divider className={cls.divide} />
          <div className={cls.promo}>
            <InfoIcon className={cls.info} />
            <div className={cls.promoTextPosition}>
              <Text className={cls.promoTitle} type="subheading" color="inherit">Free T-shirt Give Away</Text>
              <div className={cls.tshirtTitle}>
                <Avatar className={cls.tshirtIcon}>
                  <Tshirt  />
                </Avatar>
                <Text className={cls.promoSubtitle} type="body1" color="inherit">If atleast 100 people donate, Pigpile sends a free t-shirt to a lucky, randomly-selected person.</Text>
              </div>

            </div>
            <img className={cls.tshirt} src={tshirtImg} />
            <FormGroup className={cls.promoText} row>
              <FormControlLabel
                classes={{label: cls.formLabel, root: cls.formLabelRoot}}
                control={
                  <Field
                    classes={{
                      checked: cls.checked,
                      default: cls.checkboxRoot,
                    }}
                    name="tshirt"
                    component={CheckboxField}
                    label=""
                  />
                }
                label="Yes, consider me for free t-shirt give away."
              />
            </FormGroup>
          </div>

          <div className={cls.total}>
            <Subheading heavy>Total Donation: {numeral(grandTotal).format('$0,0.00')}</Subheading>
          </div>

        </form>

        <Button
          className={classNames(cls.confirm, {[cls.valid]: isValid})}
          color="accent"
          disabled={showCustomTip && (typeof customTipAmount !== 'number' || customTipAmount < 0)}
          onClick={this.handleConfirm}
          raised
        >
          Confirm
        </Button>

        {!amountProp && <Pigtail className={classNames(cls.fav, cls.logo)} />}
        {amountProp == 10 && <img src={Racoon} className={cls.fav} />}
        {amountProp == 20 && <img src={Lion} className={cls.fav} />}
        {amountProp == 50 && <img src={Giraffe} className={cls.fav} />}
        {amountProp == 100 && <img src={Monkey} className={cls.fav} />}
        {amountProp == 500 && <img src={Panda} className={cls.fav} />}
        {amountProp == 1000 && <img src={Tiger} className={cls.fav} />}
        {
          amountProp > 0 &&
          <div className={cls.thanks}>
            <Text type="caption">thank you</Text>
          </div>
        }
      </div>
    )
  }
}

HowMuchForm.propTypes = {
  classes: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  pid: PropTypes.string.isRequired,
}

const mapStateToProps = (state = {}, ownProps, values = getFormValues(FORM_NAME)(state)) => ({
  initialValues: {
    amount: 0,
    customTipAmount: null,
    showCustomTip: false,
    tip: .15,
    tshirt: true,
  },
  amount: values && values.amount,
  customTipAmount: values && values.customTipAmount,
  isValid: state.form && state.form[FORM_NAME] && !state.form[FORM_NAME].syncErrors,
  showCustomTip: values && values.showCustomTip,
  tip: values && values.tip,
  // pid: ownProps.match && ownProps.match.params && ownProps.match.params.pid,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
  reduxForm({form: FORM_NAME, onSubmit: noop => noop, validate, enableReinitialize: false, destroyOnUnmount: true}),
)(HowMuchForm)
