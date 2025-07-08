import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome Admin</h1>
      <p>Logged in as: <strong>{user?.name}</strong> ({user?.email})</p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Admin Controls</h2>
        <ul>
          <li>Manage Users</li>
          <li>Moderate Resources</li>
          <li>View Site Stats</li>
          {/* Add actual links or components here as needed */}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
