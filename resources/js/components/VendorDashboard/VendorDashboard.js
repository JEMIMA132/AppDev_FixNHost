import React from 'react';
import { CalendarCheck, Clock, CheckCircle2, CalendarDays } from 'lucide-react';
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

// --- VENDOR STATIC DATA ---
const dashboardData = {
  totalBookings: 156,
  pendingBookings: 23,
  completedBookings: 98,
  upcomingAppointments: 35,
  monthlyBookings: [
    { month: 'Jan', total: 12 },
    { month: 'Feb', total: 15 },
    { month: 'Mar', total: 18 },
    { month: 'Apr', total: 14 },
    { month: 'May', total: 20 },
    { month: 'Jun', total: 25 },
  ],
  servicePerformance: [
    { name: 'Service A', bookings: 45, revenue: 4500 },
    { name: 'Service B', bookings: 38, revenue: 3800 },
    { name: 'Service C', bookings: 32, revenue: 3200 },
    { name: 'Service D', bookings: 28, revenue: 2800 },
    { name: 'Service E', bookings: 25, revenue: 2500 },
  ],
};

const monthlyBookingsData = {
  labels: dashboardData.monthlyBookings.map(item => item.month),
  datasets: [
    {
      label: 'Bookings',
      data: dashboardData.monthlyBookings.map(item => item.total),
      backgroundColor: '#0097B2',
      borderColor: '#007A8C',
      borderWidth: 1,
    },
  ],
};

const servicePerformanceData = {
  labels: dashboardData.servicePerformance.map(service => service.name),
  datasets: [
    {
      label: 'Bookings',
      data: dashboardData.servicePerformance.map(service => service.bookings),
      backgroundColor: '#0097B2',
      borderColor: '#007A8C',
      borderWidth: 1,
    },
    {
      label: 'Revenue ($)',
      data: dashboardData.servicePerformance.map(service => service.revenue),
      backgroundColor: '#C1ECE4',
      borderColor: '#0097B2',
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
        font: { size: 14, family: "'Albert Sans', sans-serif" },
        color: '#333',
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: '#007A8C',
      titleFont: { family: "'Albert Sans', sans-serif" },
      bodyFont: { family: "'Albert Sans', sans-serif" },
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.raw}`;
        }
      }
    },
  },
  scales: {
    x: {
      ticks: { color: '#333', font: { family: "'Albert Sans', sans-serif" }, maxRotation: 45, minRotation: 45 },
      grid: { display: false },
    },
    y: {
      ticks: {
        color: '#333',
        font: { family: "'Albert Sans', sans-serif" },
        callback: (value) => value,
      },
      grid: { color: '#E5E7EB' },
      beginAtZero: true,
    },
  },
  animation: { duration: 1000, easing: 'easeOutQuart' }
};

const servicePerformanceOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: { size: 14, family: "'Albert Sans', sans-serif" },
        color: '#333',
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: '#007A8C',
      titleFont: { family: "'Albert Sans', sans-serif" },
      bodyFont: { family: "'Albert Sans', sans-serif" },
      callbacks: {
        label: function(context) {
          const label = context.dataset.label || '';
          const value = context.raw;
          return `${label}: ${label.includes('Revenue') ? '$' : ''}${value.toLocaleString()}`;
        }
      }
    },
  },
  scales: {
    x: {
      stacked: false,
      ticks: {
        color: '#333',
        font: { family: "'Albert Sans', sans-serif" },
        callback: (value) => value,
      },
      grid: { color: '#E5E7EB' },
    },
    y: {
      stacked: false,
      ticks: { 
        color: '#333',
        font: { family: "'Albert Sans', sans-serif" },
      },
      grid: { display: false },
    },
  },
  animation: { duration: 1000, easing: 'easeOutQuart' }
};

const VendorDashboard = () => (
  <div className="vendor-dashboard">
    <h2 className="vendor-dashboard__title">Dashboard Analytics</h2>
    <div className="vendor-dashboard__stats">
      <div className="vendor-dashboard__stat-card">
        <div className="vendor-dashboard__stat-content">
          <div className="vendor-dashboard__stat-header"><h3>Total Bookings</h3></div>
          <p className="vendor-dashboard__stat-value">
            <CountUp end={dashboardData.totalBookings} duration={2.5} separator="," delay={0.3} />
          </p>
        </div>
        <div className="vendor-dashboard__stat-icon-wrapper">
          <CalendarCheck className="vendor-dashboard__stat-icon" size={48} />
        </div>
      </div>
      <div className="vendor-dashboard__stat-card">
        <div className="vendor-dashboard__stat-content">
          <div className="vendor-dashboard__stat-header"><h3>Pending Bookings</h3></div>
          <p className="vendor-dashboard__stat-value">
            <CountUp end={dashboardData.pendingBookings} duration={2.5} separator="," delay={0.5} />
          </p>
        </div>
        <div className="vendor-dashboard__stat-icon-wrapper">
          <Clock className="vendor-dashboard__stat-icon" size={48} />
        </div>
      </div>
      <div className="vendor-dashboard__stat-card">
        <div className="vendor-dashboard__stat-content">
          <div className="vendor-dashboard__stat-header"><h3>Completed Bookings</h3></div>
          <p className="vendor-dashboard__stat-value">
            <CountUp end={dashboardData.completedBookings} duration={2.5} separator="," delay={0.7} />
          </p>
        </div>
        <div className="vendor-dashboard__stat-icon-wrapper">
          <CheckCircle2 className="vendor-dashboard__stat-icon" size={48} />
        </div>
      </div>
      <div className="vendor-dashboard__stat-card">
        <div className="vendor-dashboard__stat-content">
          <div className="vendor-dashboard__stat-header"><h3>Upcoming Appointments</h3></div>
          <p className="vendor-dashboard__stat-value">
            <CountUp end={dashboardData.upcomingAppointments} duration={2.5} separator="," delay={0.9} />
          </p>
        </div>
        <div className="vendor-dashboard__stat-icon-wrapper">
          <CalendarDays className="vendor-dashboard__stat-icon" size={48} />
        </div>
      </div>
    </div>
    <div className="vendor-dashboard__charts">
      <div className="vendor-dashboard__chart">
        <h3>Monthly Bookings</h3>
        <div className="vendor-dashboard__chart-container">
          <Bar data={monthlyBookingsData} options={barChartOptions} />
        </div>
      </div>
      <div className="vendor-dashboard__chart">
        <h3>Service Performance</h3>
        <div className="vendor-dashboard__chart-container">
          <Bar data={servicePerformanceData} options={servicePerformanceOptions} />
        </div>
      </div>
    </div>
  </div>
);

export default VendorDashboard;
