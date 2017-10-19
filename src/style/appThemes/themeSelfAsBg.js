export default {
  id: 'themeSelfAsBg',
  label: 'Image As Background',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      backgroundImage: 'linear-gradient(180deg, rgba(77,77,77,0.6) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 100%)',
      opacity: .94,
    },
    '&>$bg': {
      opacity: .6,
    },
  }),
  textStyle: {
  	'textStyle-4': true,
  },
  userTheme: true,
}
