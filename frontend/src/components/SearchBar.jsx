import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div style={styles.wrapper}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search resources..."
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  wrapper: {
    padding: "1rem",
    textAlign: "center",
  },
  input: {
    width: "60%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

export default SearchBar;
