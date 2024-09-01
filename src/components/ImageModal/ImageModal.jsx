import Modal from "react-modal";
import css from "./ImageModal.module.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    marginTop: "50px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242424",
    color: "white",
    display: "flex",
    gap: "10px",
    height: "80%",
    zIndex: 1500,
  },
  overlay: {
    zIndex: 1000,
  },
};

const ImageModal = ({ image, onClose }) => {
  const { urls, alt_description, user, location, likes } = image;

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={css.modalInfo}>
        <p>Photo by {user.name}</p>
        <p>Location: {user.location}</p>
        <p>{likes} likes</p>
      </div>
      <img
        src={urls.regular}
        alt={alt_description}
        className={css.modalImage}
      />
      <button onClick={onClose} className={css.modalCloseButton}>
        &times;
      </button>
    </Modal>
  );
};

export default ImageModal;
