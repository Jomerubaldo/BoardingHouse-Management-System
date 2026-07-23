import { useState, useEffect } from 'react';
import { dashboardChart } from '../../../api/paymentApi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function MonthlyPaymentChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDashboardChart = async () => {
      try {
        const result = await dashboardChart();

        const labels = result.map((row) => row.month);
        const totals = result.map((row) => parseFloat(row.total));
        console.log('totals:', totals);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Payments',
              data: totals,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 2,
              tension: 0.3,
              pointBackgroundColor: 'rgb(54, 162, 235)',
              pointBorderColor: '#fff',
              pointRadius: 4,
              fill: true,
            },
          ],
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchDashboardChart();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Total Payments' },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
export default MonthlyPaymentChart;
