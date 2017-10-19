export default {
  id: 'themeSelfAsBgBlue',
  label: 'Image As Background',
  getTheme: (theme = {}, {common: {black, white}} = theme.palette) => ({
    backgroundColor: '#1a6fc3',
    '&:after': {
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,24%,.9),rgba(255,255,255,.1))',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .5,
    },
  }),
  textStyle: {
  	'textStyle-1': true,
  },
  userTheme: true,
}
