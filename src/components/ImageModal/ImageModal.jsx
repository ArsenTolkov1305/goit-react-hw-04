import React from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";
import PropTypes from "prop-types";

ReactModal.setAppElement("#root");

export default function ImageModal({ isOpen, onClose, image }) {
  if (!image) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onClose}>
        ✖
      </button>
      <img
        src={image.largeImageURL}
        alt={image.tags}
        className={styles.image}
      />
      <p className={styles.description}>{image.tags}</p>
    </ReactModal>
  );
}

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
