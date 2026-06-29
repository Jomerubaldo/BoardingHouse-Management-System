function StatsCard({ title, value, subTitle, icon, valueColor }) {
  return (
    <div className="card border border-base-content/20 bg-[#282C34] text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
      <div className="stat">
        <div className="stat-title text-[#FFFFFF] font-bold text-2xl">
          {title}
        </div>
        <div className="stat-value font-bold" style={{ color: valueColor }}>
          {value}
        </div>
        <div className="stat-figure text-primary">{icon}</div>
        <div className="stat-desc text-[#94a1b2] font-bold">{subTitle}</div>
      </div>
    </div>
  );
}
export default StatsCard;
