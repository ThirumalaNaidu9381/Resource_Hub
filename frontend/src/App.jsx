import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import UploadResource from "./pages/UploadResource";
import MyResources from "./pages/MyResources";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import './styles/global.css';

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        {user?.role === "creator" && (
          <>
            <Link to="/upload" style={{ marginRight: "1rem" }}>Upload</Link>
            <Link to="/my-resources" style={{ marginRight: "1rem" }}>My Resources</Link>
          </>
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadResource />} />
        <Route path="/my-resources" element={<MyResources />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
