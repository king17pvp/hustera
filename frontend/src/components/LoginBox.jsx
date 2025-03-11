import { useState } from "react";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="w-230 mx-auto mt-10 mb-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-5xl font-avant-medium font-semibold mb-4">Login</h2>

      <div className="space-y-4">
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-5 py-3 border border-gray-300 rounded-xl text-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="relative w-full">
          <input

            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl text-xl focus:ring"
          />
        </div>



        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Remember me</span>
        </div>

        {/* Login Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
          Login
        </button>

        {/* Links */}
        <div className="text-sm text-center mt-2">
          <a href="#" className="text-blue-600 hover:underline">Lost your password?</a>
          <span className="mx-2">|</span>
          <a href="#" className="text-blue-600 hover:underline">Create new account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
