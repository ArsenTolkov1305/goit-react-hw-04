// imports
import { useState, useEffect, useMemo } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import styles from "./App.module.css";

const API_KEY = "UlbZlsYFw5y3EnhXrtUZBlzGU97qU1-yy9MKaqkyUhI";
const BASE_URL = "https://api.unsplash.com/search/photos";

export default function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  // Очищення стану при зміні запиту
  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (!query) return;

    if (query.trim() === "") {
      setError("Будь ласка, введіть коректний запит");
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      const url = `${BASE_URL}?client_id=${API_KEY}&query=${query}&page=${page}&per_page=12`;
      console.log("Fetching URL:", url);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "Accept-Version": "v1" },
        });
        if (!response.ok) {
          throw new Error(`HTTP помилка! статус: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received data:", data);

        if (data.results.length === 0) {
          throw new Error(`Не знайдено зображень для запиту: ${query}`);
        }

        const newImages = data.results.map((image) => ({
          id: image.id,
          webformatURL: image.urls.regular,
          largeImageURL: image.urls.full,
          tags: image.alt_description,
        }));

        console.log("New images:", newImages);
        setImages((prevImages) => [...prevImages, ...newImages]);
        setTotalHits(data.total);
        console.log("Total hits:", data.total);
      } catch (err) {
        console.error("Error details:", err);
        setError(`Помилка! ${err.message}`);
      } finally {
        setIsLoading(false);
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
    console.log("Search query received:", searchQuery);
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    console.log("State after search:", {
      query: searchQuery,
      page: 1,
      images: [],
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Мемоізація списку зображень
  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div className={showModal ? styles.modalOpen : ""}>
      <header className={styles.header}>
        <SearchBar onSubmit={handleSearch} />
      </header>
      <main>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <ImageGallery images={memoizedImages} onImageClick={openModal} />
        )}
        {!isLoading &&
          !error &&
          images.length > 0 &&
          images.length < totalHits && <LoadMoreBtn onClick={handleLoadMore} />}
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
