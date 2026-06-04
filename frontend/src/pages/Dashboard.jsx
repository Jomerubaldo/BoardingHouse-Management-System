import StatsCard from '../components/ui/StatsCard';

function Dashboard() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          Dashboard Overview
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatsCard title="Total Room" value="7" className="bg-primary" />
          <StatsCard title="Vacant Room" value="3" className="bg-warning" />
          <StatsCard title="Occupied Room" value="4" className="bg-success" />
          <StatsCard title="Total Sales" value="8500" className="bg-info" />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
