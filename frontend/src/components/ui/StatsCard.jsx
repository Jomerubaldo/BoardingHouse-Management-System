function StatsCard({ title, value }) {
  return (
    <div className="bg-yellow-400 w-96 p-5 rounded-md space-y-2">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}
export default StatsCard;
