// imports
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import styles from "./App.module.css";
// imports

export default function App() {
  const API_URL = "https://api.unsplash.com/search/photos";
  const ACCESS_KEY = "UlbZlsYFw5y3EnhXrtUZBlzGU97qU1-yy9MKaqkyUhI";

  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Мемоізація списку зображень
  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div className={selectedImage ? styles.modalOpen : ""}>
      <header className={styles.header}>
        <SearchBar onSubmit={handleSearch} />
      </header>
      <main>
        {error && <ErrorMessage message={error} />}
        <ImageGallery images={memoizedImages} onImageClick={handleImageClick} />
        {loading && <Loader />}
        {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}
      </main>
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
