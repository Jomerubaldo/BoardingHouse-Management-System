function StatsCard({ title, value }) {
  return (
    <div className="bg-indigo-500 w-96 p-5 rounded-md space-y-2">
      <h2 className="text-white font-semibold text-md">{title}</h2>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
}
export default StatsCard;
