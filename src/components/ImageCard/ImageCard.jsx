import React from "react";
import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onOpenModal }) {

  return (
    <li className={styles.card} onClick={() => onOpenModal(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        loading="lazy"
        width="400"
        height="300"
      />
      
    </li>
  );
}
