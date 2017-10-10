
export default function globalStyle(theme) {
  if (!theme) throw new Error('theme is required for including global style')
  return ({
    html: {
      boxSizing: 'border-box',
      height: '100%', // TODO flag as possible mobile issue
      touchAction: 'manipulation', // doing anything?
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      background: theme.palette.common.lightWhite,
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      height: '100%', // TODO flag as possible mobile issue
      margin: 0,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '#app': {
      height: '100%',  // TODO flag as possible mobile issue
    },

    [theme.breakpoints.up(948)]: {
      'main': {
        padding: `${theme.spacing.unit * 3}px 0`,
        // maxWidth: theme.layout.width,
        margin: '0 auto',
      },
    },
  })
}
