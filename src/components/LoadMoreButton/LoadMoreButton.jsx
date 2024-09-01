import css from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.loadMoreButton}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
