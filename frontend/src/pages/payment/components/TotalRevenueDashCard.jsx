function TotalRevenueDashCard({ getTotalRevenue }) {
  return (
    <div className="card-xs border-base-content/20 text-primary-content md:card-md lg:card-lg xl:card-xl h-auto w-auto rounded-sm border bg-[#282C34] px-10 hover:bg-black">
      <div className="stat">
        <p className="stat-title text-md font-bold text-[#FFFFFF]">
          Total Revenue
        </p>
        <div className="stat-value font-bold">
          <span className="text-warning">₱ </span>
          {getTotalRevenue}
        </div>
      </div>
    </div>
  );
}
export default TotalRevenueDashCard;
