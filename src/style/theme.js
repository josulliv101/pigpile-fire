import {createMuiTheme} from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import {layout, palette, vendor} from './_theme/'

export default function theme() {
  return createMuiTheme({
    layout,
    palette: createPalette(palette),
    vendor,
  })
}
