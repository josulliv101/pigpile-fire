
export default function globalStyle(theme) {
  if (!theme) throw new Error('theme is required for including global style')
  return ({
	   '@global': {
	   	'.sticky-outer-wrapper>div': {
	   		willChange: 'transform',
	   	},
	    '.RichEditor-root': {
	      background: '#fff',
	      border: '1px solid #ddd',
	      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
	      fontSize: '14px',
	      padding: '15px',
	      height: 'calc(100% - 140px)',
	      marginBottom: 8,
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
	      minHeight: '300px',
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
    html: {
      boxSizing: 'border-box',
      height: '100%', // TODO flag as possible mobile issue
      touchAction: 'manipulation', // doing anything?
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      background: theme.palette.grey[200],
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      height: '100%', // TODO flag as possible mobile issue
      margin: 0,
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    'h1,h2,h3,h4,h5,h6': {
      margin: 0,
      padding: 0,
    },
    form: {
    	margin: 0, 
    	padding: 0,
    },
    ul: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    '#app': {
      height: '100%',  // TODO flag as possible mobile issue
    },

    [theme.breakpoints.up(948)]: {
      main: {
        // padding: `${theme.spacing.unit * 3}px 0`,
        maxWidth: theme.layout.page.width,
        margin: '0 auto',
      },
    },
  })
}
