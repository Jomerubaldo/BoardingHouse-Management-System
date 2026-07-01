function TotalRevenueDashCard({ getTotalRevenue }) {
  return (
    <div className="card-xs border rounded-lg px-10 border-base-content/20 bg-[#282C34] text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
      <div className="stat">
        <p className="stat-title text-[#FFFFFF] font-bold text-md">
          Total Revenue
        </p>
        <div className="stat-value font-bold">
          <span className="text-amber-300">₱</span>
          {getTotalRevenue}
        </div>
      </div>
    </div>
  );
}
export default TotalRevenueDashCard;
