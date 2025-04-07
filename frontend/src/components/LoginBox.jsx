import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import axios from "axios";

const LoginBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAttemptedLogin(true);
    
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      console.log('Attempting login with:', form);
      const response = await axios.post('http://localhost:5000/auth/login', form);
      console.log('Login response:', response.data);
      
      if (response.data.success) {
        // Store auth data
        const authData = {
          user: response.data.user,
          token: response.data.token
        };
        
        // Save to localStorage
        localStorage.setItem('authData', JSON.stringify(authData));
        
        // Update Redux state
        dispatch(login(authData));
        
        // Navigate to home
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-w-2xl max-w-2xl mx-auto mt-10 mb-10 p-8 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-5xl font-avant-medium font-semibold mt-2 mb-7">Login</h2>
      {error && (
        <div className="text-red-500 text-[21px] font-bold mt-3 mb-3">{error}</div>
      )}
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

        {/* Login Button */}
        <button 
          className="w-full bg-blue-600 text-white font-avant-medium text-xl py-3 rounded-full hover:bg-blue-700 transition cursor-pointer"
          onClick={handleLogin}  
        >
          Login
        </button>

        {/* Links */}
        <div className="text-lg font-avant-medium text-center mt-2">
          <button
            onClick={() => navigate("/register")}
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
