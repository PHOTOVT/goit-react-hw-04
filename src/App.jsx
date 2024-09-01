import { useState } from "react";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchImages = async (searchQuery, pageNumber = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchQuery}&client_id=7qv9ndahgpK4rWD4WpyIdzGONESgJoJBlL2AohgaHuE`
      );

      if (response.data.results.length > 0) {
        setIsEmpty(false);
        if (pageNumber === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }
      } else {
        setIsEmpty(true);
        toast.error("No photos for this request!", {
          duration: 4000,
          position: "bottom-right",
          style: {
            paddingLeft: 25,
            width: 300,
            height: 50,
            color: "#FFFFFF",
            background: "#2E2E2E",
          },
          icon: "🚫",
        });
      }
    } catch (error) {
      toast.error("An error occurred while fetching photos.", {
        duration: 4000,
        position: "bottom-right",
        style: {
          paddingLeft: 25,
          width: 300,
          height: 50,
          color: "#FFFFFF",
          background: "#2E2E2E",
        },
        icon: "❗️",
      });
      console.error("Error fetching photos:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreButton onClick={loadMoreImages} />
      )}
      {modalImage && <ImageModal image={modalImage} onClose={closeModal} />}
    </>
  );
}

export default App;
