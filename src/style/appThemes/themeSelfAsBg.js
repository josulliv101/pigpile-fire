export default {
  id: 'themeSelfAsBg',
  label: 'Image As Background',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      backgroundImage: 'linear-gradient(180deg,#fafafa,hsla(0,0%,48%,.7))',
      opacity: .84,
    },
    '&>$bg': {
      opacity: .7,
    },
  }),
  userTheme: true,
}
