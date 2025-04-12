// imports
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import styles from "./App.module.css";
// imports

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={selectedImage ? styles.modalOpen : ""}>
      <header className={styles.header}>
        <SearchBar onSubmit={handleSearch} />
      </header>
      <main>
        <ImageGallery query={query} onImageClick={handleImageClick} />
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
