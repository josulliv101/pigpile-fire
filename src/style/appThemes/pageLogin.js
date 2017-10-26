export default {
  id: 'pageLogin',
  label: 'Login Page',
  getTheme: (theme) => ({
    backgroundColor: theme && theme.palette && theme.palette.common && theme.palette.common.black,
    '&:after': {
      backgroundImage: 'linear-gradient(180deg,#4180d7,hsla(0,0%,48%,.7))',
      height: '100vh',
      opacity: .84,
    },
    '&>$bg': {
      filter: 'blur(6px)',
      height: '100vh',
      objectPosition: 'left',
      opacity: 1,
    },
  }),
  img: 'https://firebasestorage.googleapis.com/v0/b/pigpile-next.appspot.com/o/app%2Fbg%2Flandscape.png?alt=media&token=18711e2d-2851-40f1-9f66-e4def71702f1',
  userTheme: false,
}
