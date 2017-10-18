export default {
  id: 'themeWaveBlue',
  label: 'Wave (blue)',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.17) 66%, rgba(85,85,85,0.23) 100%)',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .8,
    },
  }),
  textStyle: {
  	'textStyle-4': true,
  },
  img: 'https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Fbg%2Fblue-wave.png?alt=media&token=a00f8a89-538d-47a9-8f6f-508de8b2fe41',
  userTheme: true,
}
