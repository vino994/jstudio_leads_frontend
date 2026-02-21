import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
     toast.success("Success message");
      navigate("/");
    } catch (error) {
   toast.error("Error message");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE - Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">LeadGen Pro</h1>
        <p className="text-lg text-center max-w-md">
          Join thousands of businesses generating high-quality
          leads with our AI-powered SaaS platform.
        </p>

        <div className="mt-10 space-y-4 text-sm">
          <p>🚀 10x Faster Lead Discovery</p>
          <p>🔒 Secure & Encrypted Accounts</p>
          <p>📈 Scalable Monthly Plans</p>
          <p>📥 Instant Excel Export</p>
        </div>
      </div>

      {/* RIGHT SIDE - Register Card */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-100 p-6">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;