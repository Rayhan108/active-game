const activities = [
  {
    message: "A new message has arrived",
    time: "8:00am, today",
    action: "New Group Created",
  },
  {
    message: "A new message has arrived",
    time: "8:00am, today",
    action: "New Group Created",
  },
  {
    message: "A new message has arrived",
    time: "8:00am, today",
    action: "New Group Created",
  },
]

export function RecentActivity() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-500 mt-2"></div>
              <div>
                <p className="text-sm text-gray-300">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                <p className="text-sm text-cyan-400 mt-1">{activity.action}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 text-sm text-cyan-400 border border-cyan-400 rounded-full hover:bg-cyan-400/10 transition-colors">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
