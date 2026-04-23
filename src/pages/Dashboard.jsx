import { useState } from "react";
import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import LeadForm from "../components/LeadForm";
import LeadsTable from "../components/LeadsTable";
import Loader from "../components/Loader";
import AnalyticsCard from "../components/AnalyticsCard";
import UsageChart from "../components/UsageChart";
import RecentActivity from "../components/RecentActivity";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [requestId, setRequestId] = useState(null);
  const [usage, setUsage] = useState({ used: 0, limit: 999999 }); // unlimited
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLeadsGenerated = (data) => {
    if (!data) return;

    setLoading(true);

    setLeads(data.leads || []);
    setRequestId(data.requestId || null);

    // ✅ No limit anymore
    setUsage({
      used: data.monthlyUsed || 0,
      limit: 999999,
    });

    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {loading && <Loader />}

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 flex flex-col md:ml-0">
        <Topbar setIsOpen={setIsOpen} darkMode={darkMode} />

        <div className="p-6 md:p-10 space-y-10">

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Business Dashboard
            </h1>
            <p className="opacity-70 text-sm">
              Monitor analytics, generate leads and scale your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnalyticsCard used={usage.used} limit={usage.limit} />
            <UsageChart />
            <RecentActivity />
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
            <LeadForm onLeadsGenerated={handleLeadsGenerated} />
          </div>

          {leads.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl overflow-x-auto">
              <LeadsTable leads={leads} requestId={requestId} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;