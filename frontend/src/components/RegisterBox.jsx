import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegisterBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  // Validate passwords using useEffect
  useEffect(() => {
    if (confirmPassword.length > 0) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match!");
      } else {
        setPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  return (
    <div className="min-w-2xl max-w-2xl mx-auto mt-10 mb-10 p-8 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-5xl font-avant-medium font-semibold mt-2 mb-7">Register</h2>

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
          />
        </div>

        {/* Username Input */}
        <div>
          <input
            type="text"
            placeholder="Username*"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password*"
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

        {/* Confirm Password Input */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password*"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full mt-1 px-5 py-3 border-2 text-xl rounded-xl focus:border-black ${
              passwordError ? "border-red-500" : "border-gray-400"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-4 text-gray-400 cursor-pointer"
          >
            {showConfirmPassword ? <EyeOff size={30} /> : <Eye size={30} />}
          </button>
        </div>

        {/* Error Message */}
        {passwordError && <p className="text-red-500 text-lg">{passwordError}</p>}

        {/* Register Button */}
        <button
          className="w-full bg-blue-600 text-white font-avant-medium text-xl py-3 rounded-full hover:bg-blue-700 transition cursor-pointer"
          disabled={passwordError !== ""}
        >
          Register
        </button>

        {/* Links */}
        <div className="text-lg font-avant-medium text-center mt-2">
          <button
            onClick={() => navigate("/login")} // Navigate to register page
            className="text-blue-600 hover:underline cursor-pointer bg-transparent border-none"
          >
            Already a member? Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterBox;
