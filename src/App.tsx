import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage, UsersPage } from "./pages";
import { UserDetailsPage } from "./pages/UserDetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin">
            <Route index element={<Navigate to="users" replace />} />
            <Route path="users">
              <Route index element={<UsersPage />} />
              <Route path=":userId" element={<UserDetailsPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/admin/users" replace />} />
        <Route path="*" element={<div>Oops Nothing to See here</div>} />
      </Routes>
    </div>
  );
};

export default App;
