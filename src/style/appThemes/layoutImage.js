export default {
  id: 'image',
  getTheme: (theme) => ({
    backgroundColor: theme && theme.palette && theme.palette.common && theme.palette.common.black,
    '&:after': {
      // backgroundImage: 'linear-gradient(180deg,#4180d7,hsla(0,0%,48%,.7))',
      opacity: .84,
    },
    '&>$bg': {
      opacity: 1,
    },
  }),
}
