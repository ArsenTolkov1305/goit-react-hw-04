import styles from "./ImageGallery.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({ query, onImageClick }) {
  const API_URL = "https://api.unsplash.com/search/photos";
  const ACCESS_KEY = "UlbZlsYFw5y3EnhXrtUZBlzGU97qU1-yy9MKaqkyUhI";
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(API_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: ACCESS_KEY,
          },
        });
        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (error) {
        console.error("Помилка завантаження:", error);
        setError("Не вдалося завантажити зображення.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

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
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />
      )}
    </div>
  );
}
