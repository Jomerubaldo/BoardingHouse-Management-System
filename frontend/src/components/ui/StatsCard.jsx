function StatsCard({ title, value, subTitle, icon }) {
  return (
    <div className="card border border-base-content/20 bg-[#495057] text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
      <div className="stat">
        <div className="stat-figure text-primary">{icon}</div>
        <div className="stat-title text-[#fffffe] font-bold text-2xl">
          {title}
        </div>
        <div className="stat-value text-[#7f5af0] font-bold">{value}</div>
        <div className="stat-desc text-[#94a1b2] font-bold">{subTitle}</div>
      </div>
    </div>
  );
}
export default StatsCard;
