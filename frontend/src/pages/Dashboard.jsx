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
          <div className="card bg-neutral text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="blue"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-house-icon lucide-house"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <div className="stat-title text-lg">Total Room</div>
              <div className="stat-value text-primary">8</div>
              <div className="stat-desc">Number of rooms in the property</div>
            </div>
          </div>

          <div className="card bg-neutral text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  color="green"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-house-icon lucide-house"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <div className="stat-title text-lg">Occupied Room</div>
              <div className="stat-value text-primary">{getTotalRoom}</div>
              <div className="stat-desc">Rooms currently in use</div>
            </div>
          </div>

          <div className="card bg-neutral text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="yellow"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-house-icon lucide-house"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
              </div>
              <div className="stat-title text-lg">Vacant Room</div>
              <div className="stat-value text-primary">7</div>
              <div className="stat-desc">Rooms available for rent</div>
            </div>
          </div>

          <div className="card bg-neutral text-primary-content w-auto md:card-md lg:card-lg xl:card-xl">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
              <div className="stat-title text-lg">Total Sales</div>
              <div className="stat-value text-primary">70000</div>
              <div className="stat-desc">Overall sales amount</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
