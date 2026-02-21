function UsageCard({ used, limit }) {
  const percentage = (used / limit) * 100;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-3">
        Monthly Usage
      </h2>

      <p className="text-2xl font-bold mb-3">
        {used} / {limit}
      </p>

      <div className="w-full bg-white/30 h-3 rounded-full">
        <div
          className="bg-white h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="mt-3 text-sm opacity-80">
        {limit - used} leads remaining
      </p>
    </div>
  );
}

export default UsageCard;