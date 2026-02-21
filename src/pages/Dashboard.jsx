import { useState } from "react";
import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import LeadsTable from "../components/LeadsTable";
import UsageCard from "../components/UsageCard";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [requestId, setRequestId] = useState(null);
  const [usage, setUsage] = useState({ used: 0, limit: 20 });
const [loading, setLoading] = useState(false);
  const handleLeadsGenerated = (data) => {
    setLoading(true);
    setLeads(data.leads);
    setRequestId(data.requestId);
    setUsage({
      used: data.monthlyUsed,
      limit: data.monthlyLimit,
    });
    setLoading(false);
  };
{loading && <Loader />}
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UsageCard used={usage.used} limit={usage.limit} />
          <LeadForm onLeadsGenerated={handleLeadsGenerated} />
        </div>

        <LeadsTable leads={leads} requestId={requestId} />
      </div>
    </div>
  );
}

export default Dashboard;