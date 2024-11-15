import LandingPage from "./components/LandingPage";
import ActivityPosts from "./components/ActivityPosts";
import AdminActivities from "./components/AdminActivities";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/activities-posts" element={<ActivityPosts />} />
        {/* <Route path="/donate" element={<DonatePage />} /> */}
        <Route
          path="/login-admin"
          element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/admin/activities"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminActivities />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
