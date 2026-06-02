import StatsCard from '../components/ui/StatsCard';

function Dashboard() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-bold">Dashboard</div>
        <div className="flex justify-between">
          <StatsCard title="Total Room" value="7" />
          <StatsCard title="Vacant Room" value="3" />
          <StatsCard title="Occupied Room" value="4" />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
