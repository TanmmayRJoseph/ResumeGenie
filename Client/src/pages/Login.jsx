import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Make sure axios is imported

const LoginPage = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const darkModeToggleHandler = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/api/login`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { loggedInUser, token } = response.data;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("token", token);
        console.log(response);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row ${
        isDarkMode
          ? "bg-gray-800"
          : "bg-gradient-to-br from-[#f3e8ff] to-[#e0eaff]"
      } overflow-hidden relative`}
    >
      {/* Left Panel */}
      <motion.div
        className="z-10 flex-1 flex flex-col justify-center items-center p-10 text-center bg-base-200"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="w-40 h-40 bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 rounded-full mb-4 flex justify-center items-center text-white text-3xl font-bold"
          initial={{ y: -100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          🧞
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-purple-600 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5 }}
        >
          Welcome Back to Resume Genie 🧞
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 max-w-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          ✨ Your AI-powered resume wizard awaits. Let’s get you started again!
        </motion.p>

        <p className="text-sm text-gray-400 mt-4">
          Magic awaits! Powered by AI.
        </p>
      </motion.div>

      {/* Right Panel (Form) */}
      <motion.div
        className="z-10 flex-1 flex items-center justify-center p-8"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-purple-600">
              Log in to Your Account
            </h2>
            <p className="text-sm text-gray-500">
              Continue building your magic resume.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Log In 🚀
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/" className="link text-purple-500 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Dark Mode Toggle Icon */}
      <div
        className="fixed top-4 right-4 text-2xl text-purple-500 cursor-pointer"
        onClick={darkModeToggleHandler}
      >
        🌙
      </div>
    </div>
  );
};

export default LoginPage;
