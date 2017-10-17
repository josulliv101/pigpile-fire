import React from 'react'
// import classNames from 'classnames'
import Dropzone from 'react-dropzone'

const renderDropzoneInput = (field) => {
  const files = field.input.value
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload ) => field.input.onChange(filesToUpload)}
        style={{height: 20}}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  )
}

export default renderDropzoneInput
