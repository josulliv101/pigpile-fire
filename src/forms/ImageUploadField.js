import React from 'react'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Dropzone from 'react-dropzone'
import Camera from 'material-ui-icons/PhotoCamera'
import Typography from 'material-ui/Typography'
//

const styles = (theme) => ({
  root: {
    position: 'relative',
  },
  cameraContainer: {
    left: '50%',
    position: 'absolute',
    top: '66%',
  },
  camera: {
    color: theme.palette.primary[500],
    height: 64,
    opacity: .12,
    transform: 'translate(-50%, -50%)',
    width: 64,
    zIndex: 1,
  },
  dropzone: {
    cursor: 'pointer',
    position: 'relative',
    zIndex: 2,
  },
  lbl: {
    opacity: .5,
  },
  preview: {
    height: '100%',
    maxHeight: 64,
    width: 'auto',
  },
  results: {
    left: 0,
    position: 'absolute',
    bottom: 0,
  },
});

const renderDropzoneInput = ({classes, ...field}) => {
  const files = field.input.value
  return (
    <div className={classes.root}>
      <div className={classes.cameraContainer}>
        <Camera className={classes.camera} />
      </div>
      <div className={classes.dropzone}>
        <Dropzone
          name={field.name}
          onDrop={( filesToUpload ) => field.input.onChange(filesToUpload)}
          style={{height: 100}}
        >
          <Typography className={classes.lbl} align="center" type="body1">Drag an image file to this box, or click it to select a file.</Typography>
        </Dropzone>
        <div className={classes.results}>
          {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
          {files && Array.isArray(files) && (
            <ul style={{display: 'flex'}}>
              { files.map((file, i) => <li key={i}><img className={classes.preview} src={file.preview} /></li>) }
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}

export default withStyles(styles)(renderDropzoneInput)
