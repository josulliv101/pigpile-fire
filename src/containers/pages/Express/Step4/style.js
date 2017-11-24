// import imgBg from '../../components/Hero/landscape-flip.png'
// import { common } from 'material-ui/colors'

export const Step4 = (theme) => ({
  '@global': {
    '.RichEditor-root': {
      background: '#fff',
      border: '1px solid #ddd',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '14px',
      padding: '15px',
      height: 'calc(100% - 40px)',
    },

    '.RichEditor-editor': {
      borderTop: '1px solid #ddd',
      cursor: 'text',
      fontSize: '16px',
      marginTop: '10px',
    },

    '.RichEditor-editor .public-DraftEditorPlaceholder-root,.RichEditor-editor .public-DraftEditor-content': {
      margin: '0 -15px -15px',
      padding: '15px',
    },

    '.RichEditor-editor .public-DraftEditor-content': {
      minHeight: '100px',
    },
    '.public-DraftEditorPlaceholder-root': {
      position: 'absolute',
      color: '#AAA',
    },
    '.RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root': {
      display: 'none',
    },

    '.RichEditor-editor .RichEditor-blockquote': {
      borderLeft: '5px solid #eee',
      color: '#666',
      fontStyle: 'italic',
      margin: '16px 0',
      padding: '10px 20px',
    },

    '.RichEditor-editor .public-DraftStyleDefault-pre': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '\'Inconsolata\', \'Menlo\', \'Consolas\', monospace',
      fontSize: '16px',
      padding: '20px',
    },

    '.RichEditor-controls': {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '14px',
      marginBottom: '5px',
      userSelect: 'none',
    },

    '.RichEditor-styleButton': {
      color: '#999',
      cursor: 'pointer',
      marginRight: '16px',
      padding: '2px 0',
      display: 'inline-block',
    },

    '.RichEditor-activeButton': {
      color: '#5890ff',
    },
  },
  formStep4: {
    height: 'calc(100% - 40px)',
    opacity: 1,
    '&$loading': {
      opacity: .5,
    },
    transition: theme.transitions.create('opacity'),
  },
  title: {
    color: theme.palette.primary[600],
    fontWeight: 100,
  },
  loading: {},
})
