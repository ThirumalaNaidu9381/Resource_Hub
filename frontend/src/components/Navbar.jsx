import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f2f2f2" }}>
      <Link to="/">Home</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user?.role === "creator" && <Link to="/upload">Upload</Link>}
      {user?.role === "admin" && <Link to="/admin">Admin Dashboard</Link>}

      {user && (
        <button onClick={logout} style={{ marginLeft: "auto" }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
