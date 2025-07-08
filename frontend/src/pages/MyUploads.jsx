import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const MyUploads = () => {
  const [resources, setResources] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await API.get(`/resources/creator/${user._id}`);
        setResources(res.data);
      } catch (err) {
        console.error("Failed to load your uploads", err);
      }
    };

    if (user?.role === "creator") {
      fetchResources();
    }
  }, [user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>My Uploaded Resources</h2>
      {resources.length === 0 ? (
        <p>No resources uploaded yet.</p>
      ) : (
        <ul>
          {resources.map((res) => (
            <li key={res._id}>
              <strong>{res.title}</strong> - {res.description}
              <br />
              <a href={res.url} target="_blank" rel="noreferrer">{res.url}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyUploads;
