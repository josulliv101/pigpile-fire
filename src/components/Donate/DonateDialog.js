import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Dialog, {DialogContent, withResponsiveFullScreen} from 'material-ui/Dialog'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Slide from 'material-ui/transitions/Slide'
import Cancel from 'material-ui-icons/Close'
import Back from 'material-ui-icons/ChevronLeft'
//

const styles = (theme) => ({
  paper: {
    maxWidth: 660,
  },
  appBar: {
    position: 'relative',
  },
  back: {
    height: 32,
    width: 32,
  },
  content: {
    height: '100vh',
    padding: `${theme.spacing.unit * 4}px 0 0`,
    position: 'relative',
    width: '100vw',
  },
  flex: {
    flex: 1,
  },
  icon: {
    height: 32,
    width: 32,
  },
  toolbar: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 1,
  },
  [theme.breakpoints.up(948)]: {
    content: {
      height: 660,
      padding: theme.spacing.unit * 4,
      width: 660,
    },
  },
})

const ResponsiveDialog = withResponsiveFullScreen()(Dialog)


class DonateDialog extends PureComponent {

  state = {

  }

  render() {
    const { children, classes: cls, handleBack, handleRequestClose, open, showDetails, title } = this.props
    console.log('DonateDialog props', this.props)
    return (
      <ResponsiveDialog
        classes={{paper: cls.paper}}
        className={classNames({[cls.hide]: this.state.amountSelected})}

        onRequestClose={handleRequestClose}
        open={open}
        transition={<Slide direction="left" onEnter={() => console.log('onEnter')} onExited={() => console.log('onExited')} />}
      >
        <AppBar className={cls.appBar} elevation={1}>
          <Toolbar className={cls.toolbar}>
            <Typography type="title" color="inherit" className={cls.flex}>
              {title}
            </Typography>
            {
              showDetails &&
              <IconButton className={cls.icon} color="contrast" onClick={handleBack}>
                <Back className={cls.back} />
              </IconButton>
            }
            <IconButton className={cls.icon} color="contrast" onClick={handleRequestClose}>
              <Cancel />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className={cls.content}>
          {children}
        </DialogContent>
      </ResponsiveDialog>
    )
  }
}

DonateDialog.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = () => ({

})

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(DonateDialog)
