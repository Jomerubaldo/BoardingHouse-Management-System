import { useState, useEffect } from 'react';
import { dashboardChart } from '../../../api/paymentApi';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

        setChartData({
          labels,
          datasets: [
            {
              label: 'Total Payments',
              data: totals,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
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
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Payment Totals' },
    },
  };

  return (
    <div>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}
export default MonthlyPaymentChart;
