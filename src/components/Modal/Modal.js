import { useMemo, useEffect } from 'react';

import { func, bool } from 'prop-types';

import cn from 'classnames';

import { createPortal } from 'react-dom';

import './Modal.scss';

const modalRoot = document.getElementById('root');

function Modal({ isOpen, children, className, onClose }) {
  let element = useMemo(() => {
    let div = document.createElement('div');

    div.className = 'Modal';

    return div;
  }, []);

  let dialog = useMemo(() => {
    let div = document.createElement('div');

    div.className = cn('Modal-Dialog', className);

    return div;
  }, [className]);

  let backdrop = useMemo(() => {
    let div = document.createElement('div');

    div.className = 'Modal-Backdrop';

    return div;
  }, []);

  useEffect(() => {
    if (isOpen) {
      modalRoot.appendChild(element);
      element.appendChild(backdrop);
      element.appendChild(dialog);

      backdrop.addEventListener('click', onClose);
    }

    return () => {
      if (isOpen) {
        modalRoot.removeChild(element);

        backdrop.removeEventListener('click', onClose);
      }
    };
  }, [isOpen, onClose, dialog, element, backdrop]);

  return (
    isOpen ? createPortal(children, dialog) : null
  )
}

Modal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
};

export default Modal;
