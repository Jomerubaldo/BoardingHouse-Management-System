function DashboardStatsCard({ title, value, subTitle, icon, valueColor }) {
  return (
    <div className="card text-primary-content md:card-md lg:card-lg xl:card-xl w-auto rounded-sm bg-[#282C34] hover:bg-black">
      <div className="stat">
        <div className="stat-title text-2xl font-bold text-[#FFFFFF]">
          {title}
        </div>
        <div className="stat-value font-bold" style={{ color: valueColor }}>
          {value}
        </div>
        <div className="stat-figure text-primary">{icon}</div>
        <div className="stat-desc font-bold text-[#94a1b2]">{subTitle}</div>
      </div>
    </div>
  );
}
export default DashboardStatsCard;
