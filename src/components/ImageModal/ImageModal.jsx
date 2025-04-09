import React from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

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
        src={image.urls.regular}
        alt={image.alt_description}
        className={styles.image}
      />
      <p className={styles.description}>{image.alt_description}</p>
    </ReactModal>
  );
}
