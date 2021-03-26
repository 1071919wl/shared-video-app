import React from 'react';
import ClipLoad from '../clip/clip_load';


const Modal = ({modal, closeModal, channel}) => {
  if (!modal) {
    return null;
  }

  let component;
  
  switch (modal) {
    case 'clipLoad':
      component = <ClipLoad channel={channel}/>;
      break;
    default:
      return null;
  }
// do something similiar to mern searchbar where modal closes when clicked outside
  return (
    <div className="modal-background"  >
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        <div onClick={closeModal} id='modal_exit_button' className="close-x"></div>
        { component }
      </div>
    </div>
  );
}

export default Modal