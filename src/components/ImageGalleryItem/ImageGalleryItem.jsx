import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ smallUrl, description, bigUrl }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={smallUrl}
        alt={description}
        onClick={openModal}
      />
      {showModal && <Modal onClose={closeModal} url={bigUrl} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  smallUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bigUrl: PropTypes.string.isRequired,
};
