import React from 'react'
import classNames from 'classnames'
import Typography from 'material-ui/Typography'
import {withStyles} from 'material-ui/styles'
//

const styles = (theme) => ({
  root: {
    fontWeight: 300,
  },
  contrast: {
    color: theme.palette.common.white,
  },
  contrastHigh: {
    backgroundColor: theme.palette.common.lightWhite,
    padding: `${theme.spacing.unit * .25}px ${theme.spacing.unit * 1.5}px`,

  },
  contrastWithContrastHigh: {
    backgroundColor: theme.palette.common.lightBlack,
    padding: `${theme.spacing.unit * .25}px ${theme.spacing.unit * 1.5}px`,
  },
  display4: {},
  display3: {},
  display2: {},
  display1: {},
  gutterBottomSm: {
    marginBottom: theme.spacing.unit * .5,
  },
  gutterBottomLg: {
    marginBottom: theme.spacing.unit * 2,
  },
  gutterBottomXl: {
    marginBottom: theme.spacing.unit * 3,
  },
  gutterBottomXxl: {
    marginBottom: theme.spacing.unit * 4,
  },
  heavy: {
    fontWeight: 400,
  },
  lite: {
    fontWeight: 100,
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  xlheavy: {
    fontWeight: 500,
  },
  [theme.breakpoints.up(948)]: {
    root: {
    },
  },
})

const Base = ({classes: {contrast: clsContrast, contrastHigh: clsContrastHigh, contrastWithContrastHigh, lite: clsLite, gutterBottomSm: clsGutterBottomSm, gutterBottomLg: clsGutterBottomLg, gutterBottomXl: clsGutterBottomXl, gutterBottomXxl: clsGutterBottomXxl, heavy: clsHeavy, lowercase:clsLowercase, uppercase:clsUppercase, xlheavy: clsXlheavy, ...cls}, className, contrast, contrastHigh, gutterBottomSm, gutterBottomLg, gutterBottomXl, gutterBottomXxl,lite, lowercase, heavy, uppercase, xlheavy, ...props}) => (
  <Typography
    {...props}
    classes={cls}
    className={classNames(

      {[clsContrast]: contrast},
      {[clsContrastHigh]: contrastHigh},
      {[contrastWithContrastHigh]: contrast && contrastHigh},
      {[clsLite]: lite},
      {[clsGutterBottomSm]: gutterBottomSm},
      {[clsGutterBottomLg]: gutterBottomLg},
      {[clsGutterBottomXl]: gutterBottomXl},
      {[clsGutterBottomXxl]: gutterBottomXxl},
      {[clsHeavy]: heavy},
      {[clsLowercase]: lowercase},
      {[clsUppercase]: uppercase},
      {[clsXlheavy]: xlheavy},
      className,
    )}
    color="inherit"
  />
)

export const Display4 = withStyles(styles)(
  props => <Base {...props} type="display4" />
)

export const Display3 = withStyles(styles)(
  props => <Base {...props} type="display3" />
)

export const Display2 = withStyles(styles)(
  props => <Base {...props} type="display2" />
)

export const Display1 = withStyles(styles)(
  props => <Base {...props} type="display1" />
)

export const Headline = withStyles(styles)(
  props => <Base {...props} type="headline" />
)

export const Title = withStyles(styles)(
  props => <Base {...props} type="title" />
)

export const Subheading = withStyles(styles)(
  props => <Base {...props} type="subheading" />
)

export const Body2 = withStyles(styles)(
  props => <Base {...props} type="body2" />
)

export const Body1 = withStyles(styles)(
  props => <Base {...props} type="body1" />
)

export const Caption = withStyles(styles)(
  props => <Base {...props} type="caption" />
)

