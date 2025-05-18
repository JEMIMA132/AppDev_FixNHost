import React, { useState, useRef } from 'react';
import { Download, Search } from 'lucide-react';
import '../../../sass/AdminPages/Reports.scss';

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rootRef = useRef(null);

  // Sample data - replace with actual API data
  const reports = [
    {
      id: 'RPT001',
      vendorName: 'TechFix Pro',
      vendorType: 'Fix Vendor',
      serviceBooked: 'Computer Repair',
      serviceBookings: 45,
      totalRevenue: 22500.00,
      commissionEarned: 2250.00
    },
    {
      id: 'RPT002',
      vendorName: 'Event Masters',
      vendorType: 'Host Vendor',
      serviceBooked: 'Wedding Planning',
      serviceBookings: 30,
      totalRevenue: 45000.00,
      commissionEarned: 4500.00
    },
    // Add more sample data as needed
  ];

  const handleExportPDF = () => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add('print-only');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        root.classList.remove('print-only');
      }, 100);
    }, 50);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const filteredReports = reports.filter(report => 
    report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.serviceBooked.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-reports" ref={rootRef}>
      <div className="admin-reports__header">
        <h1>Vendor Reports</h1>
      </div>

      <div className="admin-reports__actions">
        <button 
          className="export-pdf" 
          type="button"
          onClick={handleExportPDF}
          title="Export to PDF"
        >
          <Download size={16} />
          Export to PDF
        </button>
      </div>

      <div className="admin-reports__search">
        <div className="search-group">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search reports by vendor name or service booked..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-reports__table-container">
        <table className="admin-reports__table">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Vendor Type</th>
              <th>Service Booked</th>
              <th>Service Bookings</th>
              <th>Total Revenue</th>
              <th>Commission Earned</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.map((report) => (
              <tr key={report.id}>
                <td>{report.vendorName}</td>
                <td>{report.vendorType}</td>
                <td>{report.serviceBooked}</td>
                <td>{report.serviceBookings}</td>
                <td className="revenue">{formatCurrency(report.totalRevenue)}</td>
                <td className="commission">{formatCurrency(report.commissionEarned)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-reports__pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports;
