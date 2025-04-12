import React from "react";
import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  return (
    <div className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
        onClick={onClick}
      />
    </div>
  );
}
