import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const UploadResource = () => {
  const [form, setForm] = useState({ title: "", description: "", url: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.url) {
      setError("All fields are required.");
      return;
    }

    try {
      await API.post("/resources", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccess("Resource uploaded successfully!");
      setForm({ title: "", description: "", url: "" });
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "500px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
        Upload a New Resource
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <input
        type="url"
        name="url"
        placeholder="Resource URL"
        value={form.url}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          marginTop: "1rem",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Upload
      </button>
    </form>
  );
};

export default UploadResource;
