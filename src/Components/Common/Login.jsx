import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");

    // Add login logic here
    console.log("Login submitted:", formData);
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gray-900 px-6">
      <div className="bg-gray-800 w-full max-w-md rounded-xl shadow-xl p-8 border border-gray-700">

        {/* Brand */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Elite<span className="text-green-400">Trader</span>
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Sign in to continue to your investment dashboard
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 bg-gray-700 rounded-md text-gray-200 outline-none border border-gray-600 focus:border-green-400 transition"
              placeholder="you@example.com"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 bg-gray-700 rounded-md text-gray-200 outline-none border border-gray-600 focus:border-green-400 transition"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-400 text-black font-semibold rounded-md hover:bg-green-300 transition"
          >
            Login
          </button>

        </form>

        {/* Bottom Links */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-green-400 hover:underline">
            Create account
          </a>
        </p>

        <p className="text-center text-gray-500 text-xs mt-4">
          © {new Date().getFullYear()} Elite Trader — All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Login;
