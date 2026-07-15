import { useState, useEffect } from 'react';
import { totalRepairRoom, totalRoom } from '../../api/roomApi.js';
import {
  Construction,
  DoorClosed,
  DoorClosedLocked,
  DoorOpen,
} from 'lucide-react';
import MonthlyPaymentChart from './components/MonthlyPaymentChart.jsx';
import DashboardStatsCard from './components/DashboardStatsCard.jsx';

const Max_Room = 8;

function DashboardPage() {
  const [repairRoom, setRepairRoom] = useState(0);
  const [getTotalRoom, setGetTotalRoom] = useState(0);

  useEffect(() => {
    const fetchTotalRoom = async () => {
      try {
        const result = await totalRoom();
        setGetTotalRoom(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalRoom();
  }, []);

  useEffect(() => {
    const fetchRepairRoom = async () => {
      try {
        const result = await totalRepairRoom();
        setRepairRoom(result.totalRepairingRoom);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRepairRoom();
  }, []);

  // occupied/vacant
  const countOccupiedRoom = getTotalRoom.totalRoom || 0;
  const countVacantRoom = Max_Room - countOccupiedRoom;

  return (
    <div className="@container px-5">
      <div className="flex flex-col gap-5">
        <div className="sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          <h1 className="text-[#404244] font-bold text-3xl">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <DashboardStatsCard
            valueColor="#3B82F6"
            title="Total Room"
            value={Max_Room}
            subTitle="Rooms in the property"
            icon={<DoorClosedLocked color="#3B82F6" size={44} />}
          />
          <DashboardStatsCard
            valueColor="#DC2626"
            title="Occupied Room"
            value={countOccupiedRoom}
            subTitle="Rooms currently in used"
            icon={<DoorClosed color="#DC2626" size={44} />}
          />
          <DashboardStatsCard
            valueColor="#2cb67d"
            title="Vacant Room"
            value={countVacantRoom}
            subTitle="Rooms available for rent"
            icon={<DoorOpen color="#2cb67d" size={44} />}
          />
          <DashboardStatsCard
            valueColor="#f2c94c"
            title="Repairing Room"
            value={repairRoom}
            subTitle="Rooms currently repairing"
            icon={<Construction color="#f2c94c" size={44} />}
          />
        </div>
        <MonthlyPaymentChart />
      </div>
    </div>
  );
}
export default DashboardPage;
