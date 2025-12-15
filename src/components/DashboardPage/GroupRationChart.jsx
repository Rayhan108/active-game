
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [
  { name: "Active Group", value: 150 },
  { name: "Inactive Group", value: 10 },
]

const COLORS = ["#22d3ee", "#ec4899"]

export function GroupRatioChart() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl p-6 h-[300px]">
      <h3 className="text-lg font-semibold text-white mb-4">Active & Inactive Group Ratio</h3>

      <div className="flex flex-col items-center justify-center h-[calc(100%-40px)]">
        <ResponsiveContainer width={200} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className="text-gray-400">150</span>
            <span className="text-gray-500 text-xs">Active Group</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span className="text-gray-400">10</span>
            <span className="text-gray-500 text-xs">Inactive Group</span>
          </div>
        </div>
      </div>
    </div>
  )
}
