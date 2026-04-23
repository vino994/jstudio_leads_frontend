import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./pages/Dashboard";
// import Services if you still want it
import Services from "./pages/Services";

function App() {
  return (
    <>
      <Routes>

        {/* ✅ MAIN ROUTE → Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Optional */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;