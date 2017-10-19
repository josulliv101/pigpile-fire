export default {
  id: 'themeSelfAsBgDark',
  label: 'Image As Background',
  getTheme: (theme = {}, {common: {black, white}} = theme.palette) => ({
    backgroundColor: black,
    '&:after': {
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,24%,.9),rgba(255,255,255,.1))',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .7,
    },
  }),
  textStyle: {
  	'textStyle-1': true,
  },
  userTheme: true,
}
