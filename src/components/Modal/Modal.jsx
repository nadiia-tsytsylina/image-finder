import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, url }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img className={css.Image} src={url} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
