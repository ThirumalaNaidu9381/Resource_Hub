import React from "react";

const ResourceCard = ({ resource }) => {
  return (
    <div style={styles.card}>
      <h3>{resource.title}</h3>
      <p>{resource.description}</p>
      <a href={resource.url} target="_blank" rel="noopener noreferrer">
        Visit Resource
      </a>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    margin: "1rem",
    background: "#fafafa",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

export default ResourceCard;
