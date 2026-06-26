function StatsCard({ title, value, subTitle, icon }) {
  return (
    <div className="card border bg-base-300 text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
      <div className="stat">
        <div className="stat-figure text-primary">{icon}</div>
        <div className="stat-title text-xl">{title}</div>
        <div className="stat-value text-primary">{value}</div>
        <div className="stat-desc">{subTitle}</div>
      </div>
    </div>
  );
}
export default StatsCard;
