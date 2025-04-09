// imports
import { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import styles from "./App.module.css";
// imports

export default function App() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div className={isModalOpen ? styles.modalOpen : ""}>
      <header className={styles.header}>
        <SearchBar onSubmit={handleSearch} />
      </header>
      <main>
        <ImageGallery query={query} setIsModalOpen={setIsModalOpen} />
      </main>
    </div>
  );
}
