export default {
  id: 'wave-grey',
  getTheme: (theme = {}, {common: {white}} = theme.palette) => ({
    backgroundColor: white,
    '&:after': {
      // backgroundImage: 'linear-gradient(180deg,#4180d7,hsla(0,0%,48%,.7))',
      // opacity: .84,
    },
    '&>$bg': {
      opacity: .7,
    },
  }),
  img: 'https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Fbg%2Fgrey-wave.png?alt=media&token=61428983-274c-4338-b09d-7daa8800e079',
}
