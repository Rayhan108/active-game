
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", value: 1500 },
  { month: "Feb", value: 2500 },
  { month: "Apr", value: 4500 },
  { month: "May", value: 5000 },
  { month: "June", value: 5500 },
  { month: "Jul", value: 6000 },
  { month: "Aug", value: 6200 },
  { month: "Sep", value: 6500 },
  { month: "Oct", value: 6800 },
  { month: "Nov", value: 7000 },
  { month: "Dec", value: 7500 },
]

export function EarningChart() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl p-6 h-[300px]">
      <h3 className="text-lg font-semibold text-white mb-4">Earning Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 11 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
