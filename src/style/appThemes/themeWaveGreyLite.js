export default {
  id: 'themeWaveGreyLite',
  label: 'Wave (lite grey)',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.17) 66%, rgba(85,85,85,0.23) 100%)',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .5,
    },
  }),
  textStyle: {
  	'textStyle-4': true,
  },
  img: 'https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Fbg%2Fgrey-wave.png?alt=media&token=61428983-274c-4338-b09d-7daa8800e079',
  userTheme: true,
}
