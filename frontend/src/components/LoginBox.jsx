import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="min-w-2xl max-w-2xl mx-auto mt-10 mb-10 p-8 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-5xl font-avant-medium font-semibold mt-2 mb-7">Login</h2>

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-400 cursor-pointer"
          >
            {showPassword ? <EyeOff size={30} /> : <Eye size={30} />}
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2 cursor-pointer"
          />
          <span className="text-lg font-avant-medium text-gray-600">Remember me</span>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white font-avant-medium text-xl py-3 rounded-full hover:bg-blue-700 transition cursor-pointer">
          Login
        </button>

        {/* Links */}
        <div className="text-lg font-avant-medium text-center mt-2">
          <button
            onClick={() => navigate("/register")} // Navigate to register page
            className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
