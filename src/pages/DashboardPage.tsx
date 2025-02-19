import { useAuthStore } from "../stores/authStore";

const DashboardPage = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
