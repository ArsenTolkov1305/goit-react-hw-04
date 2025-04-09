import React from "react";
import styles from "./ImageCard.module.css";

export default function ImageCard({ image }) {
  return (
    <div className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
      />
      <p className={styles.author}>Автор: {image.user.name}</p>
    </div>
  );
}
