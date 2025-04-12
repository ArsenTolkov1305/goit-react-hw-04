// imports
import { useState, useEffect } from "react";
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

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const openModal = (image) => {
    console.log("openModal image:", image);
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

  useEffect(() => {
    if (!query) return;

    if(query.trim() === '') {
      setError("Please, enter valid query")
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      const url = `${BASE_URL}?client_id=${API_KEY}&query=${query}&page=${page}&per_page=12`;
      console.log("Fetching URL:", url);

      try {
        const response = await fetch(url, { method: 'GET', headers: { 'Accept-Version': 'v1' } });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dt = await response.json();
        if(dt.results.length === 0) {
          throw new Error(`Not Found images for query: ${query}`)
        }

        const imagesWithUrls = dt.results.map(photo => ({
          id: photo.id,
          webformatURL: photo.urls.small,
          largeImageURL: photo.urls.full,
          tags: photo.alt_description || 'No description',
        }));
        setTotalHits(dt.total);
        setImages((prevImages) => [...prevImages, ...imagesWithUrls]);
      } catch (err) {
        setError(`Error! ${err.message} `);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  return (
    <div className={showModal ? styles.modalOpen : ""}>
      <header className={styles.header}>
        <SearchBar onSubmit={handleSearch} />
      </header>
      <main>
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <ImageGallery images={images} onImageClick={openModal} />
        )}
        {!isLoading && !error && images.length < totalHits && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
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
