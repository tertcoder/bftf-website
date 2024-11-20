import LandingPage from "./components/LandingPage";
import ActivityPosts from "./components/ActivityPosts";
import AdminActivities from "./components/AdminActivities";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import DonationDetails from "./components/DonationDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/activities-posts" element={<ActivityPosts />} />
          <Route path="/donate" element={<DonationDetails />} />
          <Route path="/login-admin" element={<AdminLogin />} />
          <Route
            path="/admin/activities"
            element={
              <ProtectedRoute>
                <AdminActivities />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "#4aed88",
            },
          },
          error: {
            duration: 4000,
            theme: {
              primary: "#ff4b4b",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
