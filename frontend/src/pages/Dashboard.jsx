import { useState, useEffect } from 'react';
import { totalRoom } from '../api/roomApi.js';

function Dashboard() {
  const [getTotalRoom, setGetTotalRoom] = useState(0);

  useEffect(() => {
    const fetchTotalRoom = async () => {
      try {
        const result = await totalRoom();
        setGetTotalRoom(result.length); // length para alam kung ilan na array index ang laman
      } catch (err) {
        console.error(err);
      }
    };
    fetchTotalRoom();
  }, []);

  return (
    <div className="@container">
      <div className="flex flex-col gap-5">
        <div className="font-bold sm:text-sm md:text-md lg:text-lg xl:text-2xl">
          Dashboard Overview
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <div className="card bg-primary text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="card-body">
              <h2 className="card-title">Total Room</h2>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>

          <div className="card bg-warning text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="card-body">
              <h2 className="card-title">Occupied Room</h2>
              <p className="text-2xl font-semibold">{getTotalRoom}</p>
            </div>
          </div>

          <div className="card bg-success text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="card-body">
              <h2 className="card-title">Vacant Room</h2>
              <p>3</p>
            </div>
          </div>

          <div className="card bg-info text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="card-body">
              <h2 className="card-title">Total Sales</h2>
              <p>10,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
