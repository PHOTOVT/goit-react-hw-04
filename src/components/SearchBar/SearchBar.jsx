import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.trim() === "") {
      toast.error("Please enter a search query", {
        duration: 4000,
        position: "bottom-right",
        style: {
          paddingLeft: 25,
          width: 300,
          height: 50,
          color: "#FFFFFF",
          background: "#2E2E2E",
        },
        icon: "🔎",
      });
      return;
    }
    onSubmit(input);
    setInput("");
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          className={css.searchBar}
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images"
        />
        <button className={css.searchButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
