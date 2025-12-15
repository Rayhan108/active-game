import { EarningChart } from "../../components/DashboardPage/EarningChart";
import { GroupRatioChart } from "../../components/DashboardPage/GroupRationChart";
import { RecentActivity } from "../../components/DashboardPage/RecentActivity";
import { StatCards } from "../../components/DashboardPage/StatCards";


const DashboardPage = () => {
  return (
    <div className="flex bg-[#0d0d1a] text-white">
      {/* Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-[#0d0d1a]">
        <div className="space-y-6">
          {/* Stat Cards */}
          <StatCards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Earning Revenue Trend - Takes 2 columns */}
            <div className="lg:col-span-2">
              <EarningChart />
            </div>

            {/* Active & Inactive Group Ratio */}
            <div className="lg:col-span-1">
              <GroupRatioChart />
            </div>
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
