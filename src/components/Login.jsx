import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/context/User";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { users, setUsers } = useUser();
  // Issue in password validation from backend.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation rules
    const validate = () => {
      const newErrors = {};
      if (!email) {
        newErrors.email = "Email is required";
        toast.error("Email is required"); // Show toast for missing email
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email format";
        toast.error("Invalid email format"); // Show toast for invalid email
      }

      if (!password) {
        newErrors.password = "Password is required";
        toast.error("Password is required"); // Show toast for missing password
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 8 characters long";
        toast.error("Password must be at least 8 characters long"); // Show toast for short password
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    if (!validate()) {
      console.log("Validation failed:", errors);
      return;
    }

    const obj = { email, password };

    axios
      .post(AppRoutes.login, obj)
      .then((response) => {
        toast.success("Login successful!");
        console.log("Login Successful:", response?.data);
        const { token, user } = response?.data?.data;
        setUsers([...users, user]);

        setTimeout(() => {
          switch (user?.role) {
            case "admin":
              navigate("/admin");
              break;
            case "trainer":
              navigate("/trainer");
              break;
            case "student":
              navigate("/student");
              break;
            case "user":
              navigate("/user");
              break;
            default:
              navigate("/");
          }
        }, 1000);
      })
      .catch((error) => {
        toast.error("Login failed. Please check your credentials.");
        console.error("Login failed:", error);
      });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-gray-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-gray-600 hover:text-gray-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={!email || !password}
              className={`w-full py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 
    ${!email || !password ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
