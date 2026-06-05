function StatsCard({ title, value, className }) {
  return (
    <div
      className={`card ${className} text-primary-content w-auto md:card-md lg:card-lg xl:card-xl`}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{value}</p>
      </div>
    </div>
  );
}
export default StatsCard;
