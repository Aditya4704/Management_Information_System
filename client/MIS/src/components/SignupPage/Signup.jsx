import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast

const SignupForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "normal_user",
    roomNo: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Updated for immutability
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/signup",
        formData,
        { withCredentials: true }
      );

      // Show success toast and navigate to login
      toast.success("Successfully registered!"); // Show toast notification
      navigate("/login"); // Navigate to the login page
    } catch (err) {
      // Log the actual error to understand the issue
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          >
            <option value="normal_user">Normal User</option>
            <option value="electric_jd">Electric JD</option>
            <option value="plumbing_jd">Plumbing JD</option>
            <option value="carpentry_jd">Carpentry JD</option>
            <option value="networking_jd">Networking JD</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Room No</label>
          <input
            type="text"
            name="roomNo"
            value={formData.roomNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-[#640F12]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#640F12] text-white py-2 rounded hover:bg-[#8b1a1f] transition-colors"
        >
          Sign Up
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
