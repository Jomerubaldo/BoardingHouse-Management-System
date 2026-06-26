import { useState, useEffect } from 'react';
import { totalRoom } from '../../api/roomApi.js';
import { totalSales } from '../../api/paymentApi.js';
import StatsCard from '../../components/ui/StatsCard.jsx';
import {
  DoorClosedLocked,
  DoorOpen,
  House,
  PhilippinePeso,
} from 'lucide-react';

const Max_Room = 8;

function DashboardPage() {
  const [getTotalRoom, setGetTotalRoom] = useState(0);
  const [getTotalSales, setGetTotalSales] = useState(0);

  useEffect(() => {
    const fetchTotalRoom = async () => {
      try {
        const result = await totalRoom();
        setGetTotalRoom(result); // length para alam kung ilan na array index ang laman
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalRoom();
  }, []);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const result = await totalSales();
        setGetTotalSales(result.totalSales || 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalSales();
  }, []);

  // occupied/vacant
  const countOccupiedRoom = getTotalRoom.totalRoom || 0;
  const countVacantRoom = Max_Room - countOccupiedRoom;

  return (
    <div className="@container px-5">
      <div className="flex flex-col gap-5">
        <div className="sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          <h1 className="text-[#FFFFFF] font-bold">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Total Room"
            value={Max_Room}
            subTitle="Number or rooms in the property"
            icon={<House color="#3B82F6" size={54} />}
          />
          <StatsCard
            title="Occupied Room"
            s
            value={countOccupiedRoom}
            subTitle="Rooms currently in used"
            icon={<DoorClosedLocked color="#DC2626" size={54} />}
          />
          <StatsCard
            title="Vacant Room"
            value={countVacantRoom}
            subTitle="Rooms available for rent"
            icon={<DoorOpen color="#2cb67d" size={54} />}
          />
          <StatsCard
            title="Total Sales"
            value={getTotalSales}
            subTitle="Overall sales amount"
            icon={<PhilippinePeso color="#F59E0B" size={54} />}
          />
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;
