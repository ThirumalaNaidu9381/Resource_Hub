import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreatorRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return user?.role === "creator" ? children : <Navigate to="/" />;
};

export default CreatorRoute;
