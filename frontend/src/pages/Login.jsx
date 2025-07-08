import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      login(res.data.user, res.data.token); // ✅ use context method
      navigate("/"); // or "/dashboard" if you have a creator dashboard
    } catch (err) {
      setError("Login failed");
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", marginBottom: "1rem", width: "100%" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" style={{ width: "100%" }}>Login</button>
    </form>
  );
};

export default Login;
