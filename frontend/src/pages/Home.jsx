import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const Home = () => {
  const { user, logout } = useAuth();
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await API.get("/resources");
        setResources(res.data);
      } catch (err) {
        console.error("Error fetching resources", err);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Welcome, {user?.name || "Guest"}</h1>
        <div>
          {user ? (
            <>
              {user.role === "creator" && (
                <Link to="/upload">
                  <button style={{ marginRight: "1rem" }}>Upload</button>
                </Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin">
                  <button style={{ marginRight: "1rem" }}>Admin</button>
                </Link>
              )}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button style={{ marginRight: "1rem" }}>Login</button>
              </Link>
              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
      </header>

      <input
        type="text"
        placeholder="🔍 Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "0.75rem",
          margin: "2rem 0",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {filteredResources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        filteredResources.map((res) => (
          <div key={res._id} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #eee", borderRadius: "6px" }}>
            <h3>{res.title}</h3>
            <p>{res.description}</p>
            <a href={res.url} target="_blank" rel="noopener noreferrer">{res.url}</a>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
