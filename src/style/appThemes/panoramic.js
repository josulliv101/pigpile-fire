export default {
  id: 'panoramic',
  label: 'Panoramic Main Image',
  getTheme: (theme) => ({
    backgroundColor: theme && theme.palette && theme.palette.common && theme.palette.common.black,
    '&:after': {
      backgroundImage: 'linear-gradient(180deg, rgba(77,77,77,0.6) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 100%)',
      opacity: .84,
    },
    '&>$bg': {
      backgroundColor: 'red',
      opacity: 1,
    },
  }),
  img: null,
  userTheme: true,
}
