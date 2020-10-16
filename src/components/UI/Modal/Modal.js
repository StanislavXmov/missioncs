import React from 'react';
import classes from './Modal.module.scss';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({children, show, modalClosed}) => (
  <Auxiliary>
    <Backdrop show={show} clicked={modalClosed} />
    <div className={classes.Modal} style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }} >
      {children}
    </div>
  </Auxiliary>
);

export default React.memo(Modal, (prev, next) => next.show === prev.show && next.children === prev.children);