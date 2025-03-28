import { useState } from "react";
import { LogIn, AlertCircle } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLogin, useUser } from "../features/auth/useAuth";
import logo from "../assets/logo_2.png";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useUser();
  const {
    mutate: login,
    isLoading: loginLoading,
    error,
  } = useLogin({
    onSuccess: () => {
      navigate("/admin/activities");
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Redirect authenticated users to /admin/activities
  if (user && !userLoading) {
    return <Navigate to="/admin/activities" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src={logo} alt="" className="w-36 mx-auto" />
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error.message}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-secondary hover:text-[#388E3C]"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex justify-center items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-white hover:bg-[#388E3C] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loginLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign in</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
