import React, {Component} from 'react'
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'

class RichEditorExample extends React.Component {

  constructor(props) {
    super(props)

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => props.onEditorStateChange(editorState) // this.setState({editorState})

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.onTab = (e) => this._onTab(e)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)

  }

  _handleKeyCommand(command) {
    const {editorState} = this.props
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _onTab(e) {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.props.editorState, maxDepth))
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.props.editorState,
        inlineStyle
      )
    )
  }

  render() {
    const {editorState} = this.props

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    var contentState = editorState.getCurrentContent()
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder'
      }
    }

    return (
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell people about your fundraiser..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    )
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return null
  }
}

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

const BLOCK_TYPES = [
/*  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},*/
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  // {label: 'Code Block', style: 'code-block'},
]

const BlockStyleControls = (props) => {
  const {editorState} = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
]

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  )
}

export default class EditorField extends Component {

  constructor(props) {
    super(props)
    console.log('EditorField', props)
    // here we create the empty state
    let editorState = EditorState.createEmpty()
    // if the redux-form field has a value
    if (props.input && props.input.value) {
      const val = typeof props.input.value === 'string' ? JSON.parse(props.input.value) : props.input.value
      console.log('parsed story', val)
      const story = Object.assign({entityMap: {}, blocks: []}, val)
    // convert the editorState to whatever you'd like
      editorState = EditorState.createWithContent(convertFromRaw(story))
    }
    // Set the editorState on the state
    this.state = {
      editorState,
    }
  }


  componentDidMount = () => {
  	const {input: {name} = {}, stringify} = this.props
  	// Give the editor a chance to affect persisting data by giving
  	// ability to set state on parent. For example, this good be a good
  	// place to have a prop that managed whether a persist was a 'merge' or 'replace'
  	console.log('Editor componentDidMount###', this.props)
  	if (this.props.setParentState) {
  		this.props.setParentState({stringify})
  	}
  }

  componentWillUnmount = () => {
  	console.log('Editor### componentWillUnmount', this.props)
  	if (this.props.setParentState) {
  		this.props.setParentState({stringify: null})
  	}
  }

  onChange = (editorState) => {
    console.log('onChange', editorState)
    const { input } = this.props

    console.log('!!!', editorState.getCurrentContent().getBlocksAsArray())

    // converting to the raw JSON on change
    input.onChange(convertToRaw(editorState.getCurrentContent()))
    // Set it on the state
    this.setState({ editorState })
  }

  render() {
    const {input} = this.props // field
    // const {value, ...input} = inputProp
    console.log('input', input)
    return (
      <RichEditorExample {...input}
        onEditorStateChange={this.onChange}
        editorState={this.state.editorState}
      />
    )
  }
}
