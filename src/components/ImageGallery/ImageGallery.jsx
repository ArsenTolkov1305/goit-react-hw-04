import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ImageCard from "../ImageCard/ImageCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import styles from "./ImageGallery.module.css";

const API_URL = "https://api.unsplash.com/search/photos";
const ACCESS_KEY = "UlbZlsYFw5y3EnhXrtUZBlzGU97qU1-yy9MKaqkyUhI";

export default function ImageGallery({ query, setIsModalOpen }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [images]);

  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div>
      {error && <ErrorMessage message={error} />}
      <ul className={styles.gallery}>
        {memoizedImages.map((image) => (
          <li
            key={image.id}
            className={styles.item}
            onClick={() => {
              setSelectedImage(image);
              setIsModalOpen(true);
            }}
          >
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />
      )}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => {
          setSelectedImage(null);
          setIsModalOpen(false);
        }}
        image={selectedImage}
      />
    </div>
  );
}
