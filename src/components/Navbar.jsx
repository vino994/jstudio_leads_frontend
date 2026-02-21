import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const name = user?.name || "User";
  const plan = user?.plan || "free";
  const initial = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-600">
            LeadGen Pro
          </h1>
          <p className="text-xs text-gray-500">
            Smart Lead Generation Platform
          </p>
        </div>

        <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
          {plan.toUpperCase()} PLAN
        </span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer font-semibold hover:scale-105 transition"
        >
          {initial}
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-52 bg-white shadow-lg rounded-xl border py-2">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-semibold">{name}</p>
              <p className="text-xs text-gray-500">{plan.toUpperCase()} Plan</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;