import { Users, MessageSquare, Wallet, DollarSign } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500",
    label: "Total User",
    gradient: "from-cyan-500 to-blue-500",
    borderGradient: "from-cyan-400 via-blue-500 to-purple-500",
  },
  {
    icon: MessageSquare,
    value: "10",
    label: "Total Pot Group",
    gradient: "from-purple-500 to-pink-500",
    borderGradient: "from-purple-400 via-pink-500 to-red-400",
  },
  {
    icon: Wallet,
    value: "$500",
    label: "Total avatar sells",
    gradient: "from-gray-500 to-gray-600",
    borderGradient: "from-gray-400 via-gray-500 to-gray-600",
  },
  {
    icon: DollarSign,
    value: "$1000",
    label: "Monthly Revenue",
    gradient: "from-cyan-500 to-teal-500",
    borderGradient: "from-cyan-400 via-teal-500 to-green-400",
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative rounded-xl p-[1px] bg-gradient-to-r"
          style={{
            background: `linear-gradient(to right, ${
              index === 0
                ? "#22d3ee, #3b82f6, #8b5cf6"
                : index === 1
                  ? "#a855f7, #ec4899, #f87171"
                  : index === 2
                    ? "#6b7280, #9ca3af, #6b7280"
                    : "#22d3ee, #14b8a6, #22c55e"
            })`,
          }}
        >
          <div className="bg-[#1a1a2e] rounded-xl p-4 h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
              <div className="p-2 rounded-lg bg-[#252540]">
                <stat.icon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
