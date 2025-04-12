import React from "react";
import styles from "./ImageCard.module.css";
import PropTypes from "prop-types";

export default function ImageCard({ image, onOpenModal }) {
  return (
    <div className={styles.card}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles.image}
        loading="lazy"
        width="400"
        height="300"
        onClick={() => onOpenModal(image)}
      />
    </div>
  );
}

ImageCard.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
