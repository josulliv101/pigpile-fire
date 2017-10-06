import { create } from 'jss'
import preset from 'jss-preset-default'
import createGenerateClassName from 'material-ui/styles/createGenerateClassName'

// Server side only
export default function configureJss() {

  // Configure JSS
  const jss = create(preset())
  jss.options.createGenerateClassName = createGenerateClassName
  return jss
}
