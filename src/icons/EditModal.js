import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

function EditModal(props) {
  return (
    <SvgIcon {...props}>
      <path d="M17.68,18.79H2.21V3.32H9.95V1.11H2.21A2.21,2.21,0,0,0,0,3.32V18.79A2.21,2.21,0,0,0,2.21,21H17.68a2.22,2.22,0,0,0,2.21-2.21V11.05H17.68Z"/>
      <path d="M6.63,11.38v3h3l8.83-8.83-3-3ZM20.77,3.23a.79.79,0,0,0,0-1.13L18.9.23a.79.79,0,0,0-1.13,0L16.31,1.69l3,3Z"/>
    </SvgIcon>
  );
}

export default EditModal;