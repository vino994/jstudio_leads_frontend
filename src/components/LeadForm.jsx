import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Loader from "./Loader";

function LeadForm({ onLeadsGenerated }) {
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/leads/generate", {
        location,
        businessType,
        count,
      });

      onLeadsGenerated(res.data);
      toast.success("Leads generated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error generating leads"
      );
    }

    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4">
          Generate Leads
        </h2>

        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 border rounded mb-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Business Type"
          className="w-full p-3 border rounded mb-3"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Count"
          className="w-full p-3 border rounded mb-4"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          max={50}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Generate
        </button>
      </form>
    </>
  );
}

export default LeadForm;