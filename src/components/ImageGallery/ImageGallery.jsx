import styles from "./ImageGallery.module.css";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function ImageGallery({ query, onImageClick }) {
  const API_URL = "https://api.unsplash.com/search/photos";
  const ACCESS_KEY = "UlbZlsYFw5y3EnhXrtUZBlzGU97qU1-yy9MKaqkyUhI";

  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Очищення стану при зміні запиту
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  // Завантаження зображень
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

        // Перевірка наявності результатів
        if (response.data && response.data.results) {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        } else {
          setError("Результати не знайдено.");
        }
      } catch (error) {
        console.error("Помилка завантаження:", error);
        setError("Не вдалося завантажити зображення.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  // Автоматичний скролл до нових зображень
  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [images]);

  // Мемоізація списку зображень
  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <ul className={styles.gallery}>
        {memoizedImages.map((image) => (
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
