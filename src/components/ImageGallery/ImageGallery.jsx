import styles from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PropTypes from 'prop-types';

export default function ImageGallery({ images, onImageClick, error }) {


  return (
    <div>
       {error && <ErrorMessage message={error} />}
      <ul className={styles.gallery}>
        {images.map((image) => (
          <li
            key={image.id}
            className={styles.item}
            onClick={() => onImageClick(image)}
          >
          <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
    error: PropTypes.string
};
