import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import axios from "axios";

const RegisterBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [attemptedRegister, setAttemptedRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", role: "student" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "role" ? value.toLowerCase() : value,
    }));
  };

  const handleRegister = async (e) => {
    setAttemptedRegister(true)
    if (!form.email || !form.password || !form.role || !form.confirmPassword) {
      setError('Please fill in all fields');
      return;
    } 

    if (form.password !== form.confirmPassword && form.password && form.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    e.preventDefault();
    try {
      setAttemptedRegister(false);
      const response = await axios.post('http://localhost:5001/register', form);
      console.log(response.data.user);
      navigate('/settings');
    } catch (err) {
      setError(err.response?.data?.message || 'Error register');
    }
  }


  return (
    <div className="min-w-2xl max-w-2xl mx-auto mt-10 mb-10 p-8 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-5xl font-avant-medium font-semibold mt-2 mb-7">Register</h2>

      {error && <div className="text-red-500 text-[21px] font-bold mb-5">{error}</div>}

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password*"
            value={form.password}
            onChange={handleChange}
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
            name="confirmPassword"
            placeholder="Confirm Password*"
            value={form.confirmPassword}
            onChange={handleChange}
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

        {/* Role Selection */}
        <div>
          <label className="block text-[25px] font-avant-medium font-semibold text-black mb-2">Select Role</label>
          <div className="relative">
            <select
              value={form.role}
              name="role"
              onChange={handleChange}
              className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl cursor-pointer focus:border-black appearance-none"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {passwordError && <p className="text-red-500 text-lg">{passwordError}</p>}

        {/* Register Button */}
        <button
          className="w-full bg-blue-600 text-white font-avant-medium text-xl py-3 rounded-full hover:bg-blue-700 transition cursor-pointer"
          disabled={passwordError !== ""}
          onClick={handleRegister}
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
