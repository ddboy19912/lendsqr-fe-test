import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import LoadingSpinner from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages";

const UsersPage = lazy(() => import("./pages/UsersPage"));
const UserDetailsPage = lazy(
  () => import("./pages/UserDetails/UserDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
              <Route
                index
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <UsersPage />
                  </Suspense>
                }
              />
              <Route
                path=":userId"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <UserDetailsPage />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/admin/users" replace />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
