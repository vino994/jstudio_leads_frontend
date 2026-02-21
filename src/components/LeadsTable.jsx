import api from "../services/api";

function LeadsTable({ leads, requestId }) {
  if (!leads || leads.length === 0) return null;

  const handleDownload = async () => {
    try {
      const response = await api.get(
        `/leads/download/excel/${requestId}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "leads.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error downloading file");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Generated Leads
        </h2>

        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Download Excel
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-left">Address</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">{lead.Name}</td>
              <td className="px-6 py-4">{lead.Phone}</td>
              <td className="px-6 py-4">{lead.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadsTable;