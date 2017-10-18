export default {
  id: 'themeSelfAsBg',
  label: 'Image As Background',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,48%,.7),rgba(255,255,255,.24))',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .7,
    },
  }),
  textStyle: {
  	'textStyle-4': true,
  },
  userTheme: true,
}
