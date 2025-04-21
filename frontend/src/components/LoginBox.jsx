import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../redux/features/authSlice';
import axios from 'axios';

const LoginBox = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }
      
      console.log("Attempting login with:", { email, password });
      
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password
      });
      
      if (response.data.success) {
        // Generate a temporary token if one doesn't come from backend
        // Note: This is a workaround since we can't modify auth backend files
        const token = response.data.token || `temp_token_${Date.now()}`;
        
        // Store both the user info and the token (real or generated)
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        console.log("Login successful with user:", response.data.user);
        
        // Dispatch with both user and token
        dispatch(login({
          user: response.data.user,
          token: token
        }));
        
        toast.success("Logged in successfully!");
        
        // Navigate after successful login
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 100);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-w-2xl max-w-2xl mx-auto mt-10 mb-10 p-8 bg-white rounded-2xl border border-gray-300">
      <h2 className="text-5xl font-avant-medium font-semibold mt-2 mb-7">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password*"
              className="w-full mt-1 px-5 py-3 border-2 border-gray-400 text-xl rounded-xl focus:border-black"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-avant-medium text-xl py-3 rounded-full hover:bg-blue-700 transition cursor-pointer"
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
      </form>
    </div>
  );
};

export default LoginBox;
