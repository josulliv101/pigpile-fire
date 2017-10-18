export default {
  id: 'themeWavePink',
  label: 'Wave (pink)',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      backgroundImage: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.17) 66%, rgba(215, 98, 215, 0.35) 100%)',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .5,
    },
  }),
  textStyle: {
  	'textStyle-4': true,
  },
  img: 'https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Fbg%2Fpink-wave.jpg?alt=media&token=4ac9a868-ea61-4ede-be5f-6a13cd411bb4',
  userTheme: true,
}
