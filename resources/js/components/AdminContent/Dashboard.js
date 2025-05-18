import React from 'react';
import { UsersRound, UserCheck, ClipboardCheck, UserPlus } from 'lucide-react';
import { Bar } from "react-chartjs-2";
import CountUp from 'react-countup';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- STATIC DATA ---
const dashboardData = {
  totalRegisteredUsers: 3200,
  activeVendors: 120,
  totalBookings: 5400,
  newSignups: 85,
  monthlySales: [
    { month: 'Jan', total: 5000 },
    { month: 'Feb', total: 6000 },
    { month: 'Mar', total: 7500 },
    { month: 'Apr', total: 8000 },
    { month: 'May', total: 9000 },
    { month: 'Jun', total: 10000 },
  ],
  topVendors: [
    { name: 'Vendor A', sales: 25000, bookings: 150 },
    { name: 'Vendor B', sales: 22000, bookings: 120 },
    { name: 'Vendor C', sales: 18000, bookings: 95 },
    { name: 'Vendor D', sales: 15000, bookings: 80 },
    { name: 'Vendor E', sales: 12000, bookings: 65 },
  ],
};

const monthlySalesData = {
  labels: dashboardData.monthlySales.map(item => item.month),
  datasets: [
    {
      label: 'Sales ($)',
      data: dashboardData.monthlySales.map(item => item.total),
      backgroundColor: '#3AA6B9',
      borderColor: '#2A8291',
      borderWidth: 1,
    },
  ],
};

const topVendorsData = {
  labels: dashboardData.topVendors.map(vendor => vendor.name),
  datasets: [
    {
      label: 'Sales ($)',
      data: dashboardData.topVendors.map(vendor => vendor.sales),
      backgroundColor: '#3AA6B9',
      borderColor: '#2A8291',
      borderWidth: 1,
    },
    {
      label: 'Bookings',
      data: dashboardData.topVendors.map(vendor => vendor.bookings),
      backgroundColor: '#C1ECE4',
      borderColor: '#3AA6B9',
      borderWidth: 1,
    }
  ],
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 14, family: "'Arial', sans-serif" },
        color: '#333',
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: '#2A8291',
      titleFont: { family: "'Arial', sans-serif" },
      bodyFont: { family: "'Arial', sans-serif" },
      callbacks: {
        label: function(context) {
          return `$${context.raw.toLocaleString()}`;
        }
      }
    },
  },
  scales: {
    x: {
      ticks: { color: '#333', font: { family: "'Arial', sans-serif" }, maxRotation: 45, minRotation: 45 },
      grid: { display: false },
    },
    y: {
      ticks: {
        color: '#333',
        font: { family: "'Arial', sans-serif" },
        callback: (value) => `$${value.toLocaleString()}`,
      },
      grid: { color: '#E5E7EB' },
      beginAtZero: true,
    },
  },
  animation: { duration: 1000, easing: 'easeOutQuart' }
};

const topVendorsOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 14, family: "'Arial', sans-serif" },
        color: '#333',
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: '#2A8291',
      titleFont: { family: "'Arial', sans-serif" },
      bodyFont: { family: "'Arial', sans-serif" },
      callbacks: {
        label: function(context) {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${label.includes('Sales') ? '$' : ''}${value.toLocaleString()}`;
        }
      }
    },
  },
  scales: {
    x: {
      stacked: false,
      ticks: {
        color: '#333',
        font: { family: "'Arial', sans-serif" },
        callback: (value) => `$${value.toLocaleString()}`,
      },
      grid: { color: '#E5E7EB' },
    },
    y: {
      stacked: false,
      ticks: { 
        color: '#333',
        font: { family: "'Arial', sans-serif" },
      },
      grid: { display: false },
    },
  },
  animation: { duration: 1000, easing: 'easeOutQuart' }
};

const Dashboard = () => (
  <div className="dashboard">
    <h2 className="dashboard__title">Dashboard Analytics</h2>
    <div className="dashboard__stats">
      <div className="dashboard__stat-card">
        <div className="dashboard__stat-content">
          <div className="dashboard__stat-header"><h3>Total Registered Users</h3></div>
          <p className="dashboard__stat-value">
            <CountUp end={dashboardData.totalRegisteredUsers} duration={2.5} separator="," delay={0.3} />
          </p>
        </div>
        <div className="dashboard__stat-icon-wrapper">
          <UsersRound className="dashboard__stat-icon" size={48} />
        </div>
      </div>
      <div className="dashboard__stat-card">
        <div className="dashboard__stat-content">
          <div className="dashboard__stat-header"><h3>Active Vendors</h3></div>
          <p className="dashboard__stat-value">
            <CountUp end={dashboardData.activeVendors} duration={2.5} separator="," delay={0.5} />
          </p>
        </div>
        <div className="dashboard__stat-icon-wrapper">
          <UserCheck className="dashboard__stat-icon" size={48} />
        </div>
      </div>
      <div className="dashboard__stat-card">
        <div className="dashboard__stat-content">
          <div className="dashboard__stat-header"><h3>Total Bookings</h3></div>
          <p className="dashboard__stat-value">
            <CountUp end={dashboardData.totalBookings} duration={2.5} separator="," delay={0.7} />
          </p>
        </div>
        <div className="dashboard__stat-icon-wrapper">
          <ClipboardCheck className="dashboard__stat-icon" size={48} />
        </div>
      </div>
      <div className="dashboard__stat-card">
        <div className="dashboard__stat-content">
          <div className="dashboard__stat-header"><h3>New Signups</h3></div>
          <p className="dashboard__stat-value">
            <CountUp end={dashboardData.newSignups} duration={2.5} separator="," delay={0.9} />
          </p>
        </div>
        <div className="dashboard__stat-icon-wrapper">
          <UserPlus className="dashboard__stat-icon" size={48} />
        </div>
      </div>
    </div>
    <div className="dashboard__charts">
      <div className="dashboard__chart">
        <h3>Monthly Sales</h3>
        <div className="dashboard__chart-container">
          <Bar data={monthlySalesData} options={barChartOptions} />
        </div>
      </div>

      <div className="dashboard__chart">
        <h3>Top Performing Vendors</h3>
        <div className="dashboard__chart-container">
          <Bar data={topVendorsData} options={topVendorsOptions} />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;