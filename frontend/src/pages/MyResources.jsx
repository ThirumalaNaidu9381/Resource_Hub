import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

function MyResources() {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchResources = async () => {
      try {
        const res = await API.get("/resources/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setResources(sorted);
      } catch (err) {
        console.error("Fetch failed:", err.response?.data || err.message);
        setError("Failed to load resources.");
      }
    };

    fetchResources();
  }, [token]);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>My Uploaded Resources</h2>
      {error && <p style={errorStyle}>{error}</p>}
      {resources.length === 0 && !error ? (
        <p style={emptyStyle}>No resources uploaded yet.</p>
      ) : (
        <ul style={listStyle}>
          {resources.map((r) => (
            <li key={r._id} style={itemStyle}>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <a href={r.url} target="_blank" rel="noreferrer" style={linkStyle}>
                {r.url.length > 80 ? r.url.slice(0, 80) + "..." : r.url}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const containerStyle = {
  maxWidth: "800px",
  margin: "3rem auto",
  padding: "2rem",
  fontFamily: "Segoe UI, Arial, sans-serif",
  backgroundColor: "#fff",
};

const headingStyle = {
  textAlign: "center",
  fontSize: "1.8rem",
  marginBottom: "2rem",
};

const errorStyle = {
  color: "red",
  textAlign: "center",
};

const emptyStyle = {
  textAlign: "center",
  fontStyle: "italic",
  color: "#666",
};

const listStyle = {
  listStyle: "none",
  padding: 0,
};

const itemStyle = {
  padding: "1rem",
  marginBottom: "1.5rem",
  backgroundColor: "#f8f8f8",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
};

const linkStyle = {
  color: "#4f46e5",
  textDecoration: "none",
  wordBreak: "break-word",
  transition: "color 0.2s",
  display: "inline-block",
};
linkStyle[':hover'] = {
  color: "#3730a3",
};

export default MyResources;
