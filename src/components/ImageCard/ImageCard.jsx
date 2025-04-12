import React from "react";
import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onOpenModal }) {
  const handleCardClick = () => {
    onOpenModal(image.largeImageURL);
  };

  return (
    <li className={styles.card} onClick={handleCardClick}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={styles.image}
        loading="lazy"
        width="320"
        height="240"
      />
    </li>
  );
}
