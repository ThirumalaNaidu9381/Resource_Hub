import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return user?.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
