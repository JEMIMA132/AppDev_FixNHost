import React, { useState } from 'react';
import { Eye, Search } from 'lucide-react';
import TransactModal from './TransactModal';
import '../../../sass/AdminPages/Transactions.scss';

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample data - replace with actual API data
  const transactions = [
    {
      id: 'TRX001',
      transactionId: 'TRX001',
      bookingId: 'BK001',
      clientName: 'John Doe',
      vendorName: 'TechFix Pro',
      vendorType: 'Fix Vendor',
      serviceBooked: 'Computer Repair',
      eventDate: '2024-03-15',
      bookingStatus: 'confirmed',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      dateBooked: '2024-03-10',
      amount: '299.99',
      currency: 'USD',
      description: 'Computer repair and maintenance service',
      receiptNumber: 'RCP001'
    },
    {
      id: 'TRX002',
      transactionId: 'TRX002',
      bookingId: 'BK002',
      clientName: 'Jane Smith',
      vendorName: 'Event Masters',
      vendorType: 'Host Vendor',
      serviceBooked: 'Wedding Planning',
      eventDate: '2024-04-20',
      bookingStatus: 'pending',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending',
      dateBooked: '2024-03-12',
      amount: '1500.00',
      currency: 'USD',
      description: 'Wedding planning and coordination service',
      receiptNumber: 'RCP002'
    },
    {
      id: 'TRX003',
      transactionId: 'TRX003',
      bookingId: 'BK003',
      clientName: 'Mike Johnson',
      vendorName: 'Home Solutions',
      vendorType: 'Fix Vendor',
      serviceBooked: 'Plumbing Repair',
      eventDate: '2024-03-18',
      bookingStatus: 'confirmed',
      paymentMethod: 'debit_card',
      paymentStatus: 'paid',
      dateBooked: '2024-03-14',
      amount: '450.00',
      currency: 'USD',
      description: 'Emergency plumbing repair service',
      receiptNumber: 'RCP003'
    },
    {
      id: 'TRX004',
      transactionId: 'TRX004',
      bookingId: 'BK004',
      clientName: 'Sarah Williams',
      vendorName: 'Party Planners Plus',
      vendorType: 'Host Vendor',
      serviceBooked: 'Birthday Party',
      eventDate: '2024-05-01',
      bookingStatus: 'confirmed',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      dateBooked: '2024-03-15',
      amount: '800.00',
      currency: 'USD',
      description: 'Children\'s birthday party planning and hosting',
      receiptNumber: 'RCP004'
    },
    {
      id: 'TRX005',
      transactionId: 'TRX005',
      bookingId: 'BK005',
      clientName: 'David Brown',
      vendorName: 'Auto Care Experts',
      vendorType: 'Fix Vendor',
      serviceBooked: 'Car Maintenance',
      eventDate: '2024-03-20',
      bookingStatus: 'cancelled',
      paymentMethod: 'cash',
      paymentStatus: 'refunded',
      dateBooked: '2024-03-16',
      amount: '350.00',
      currency: 'USD',
      description: 'Full car maintenance and inspection service',
      receiptNumber: 'RCP005'
    },
    {
      id: 'TRX006',
      transactionId: 'TRX006',
      bookingId: 'BK006',
      clientName: 'Emily Davis',
      vendorName: 'Corporate Events',
      vendorType: 'Host Vendor',
      serviceBooked: 'Business Conference',
      eventDate: '2024-06-15',
      bookingStatus: 'confirmed',
      paymentMethod: 'bank_transfer',
      paymentStatus: 'paid',
      dateBooked: '2024-03-17',
      amount: '5000.00',
      currency: 'USD',
      description: 'Annual business conference organization and hosting',
      receiptNumber: 'RCP006'
    },
    {
      id: 'TRX007',
      transactionId: 'TRX007',
      bookingId: 'BK007',
      clientName: 'Robert Wilson',
      vendorName: 'Smart Home Tech',
      vendorType: 'Fix Vendor',
      serviceBooked: 'Smart Home Setup',
      eventDate: '2024-03-25',
      bookingStatus: 'pending',
      paymentMethod: 'credit_card',
      paymentStatus: 'pending',
      dateBooked: '2024-03-18',
      amount: '1200.00',
      currency: 'USD',
      description: 'Smart home system installation and setup',
      receiptNumber: 'RCP007'
    },
    {
      id: 'TRX008',
      transactionId: 'TRX008',
      bookingId: 'BK008',
      clientName: 'Lisa Anderson',
      vendorName: 'Gourmet Catering',
      vendorType: 'Host Vendor',
      serviceBooked: 'Corporate Lunch',
      eventDate: '2024-04-05',
      bookingStatus: 'confirmed',
      paymentMethod: 'debit_card',
      paymentStatus: 'paid',
      dateBooked: '2024-03-19',
      amount: '2500.00',
      currency: 'USD',
      description: 'Corporate lunch catering for 50 people',
      receiptNumber: 'RCP008'
    }
  ];

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleTransactionUpdated = (updatedTransaction, isEdit) => {
    // Handle transaction update if needed
    console.log('Transaction updated:', updatedTransaction);
    setIsModalOpen(false);
  };

  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-transactions">
      <div className="admin-transactions__header">
        <h1>Transactions Management</h1>
      </div>

      <div className="admin-transactions__search">
        <div className="search-group">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search transactions by ID, client name, or vendor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-transactions__table-container">
        <table className="admin-transactions__table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Vendor Name</th>
              <th>Vendor Type</th>
              <th>Service Booked</th>
              <th>Event/Service Date</th>
              <th>Booking Status</th>
              <th>Payment Method</th>
              <th>Payment Status</th>
              <th>Date Booked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.clientName}</td>
                <td>{transaction.vendorName}</td>
                <td>{transaction.vendorType}</td>
                <td>{transaction.serviceBooked}</td>
                <td>{new Date(transaction.eventDate).toLocaleDateString()}</td>
                <td>
                  <span className={`admin-transactions__status admin-transactions__status--${transaction.bookingStatus}`}>
                    {transaction.bookingStatus}
                  </span>
                </td>
                <td>{transaction.paymentMethod}</td>
                <td>
                  <span className={`admin-transactions__payment-status admin-transactions__payment-status--${transaction.paymentStatus}`}>
                    {transaction.paymentStatus}
                  </span>
                </td>
                <td>{new Date(transaction.dateBooked).toLocaleDateString()}</td>
                <td>
                  <div className="admin-transactions__actions">
                    <button
                      className="view"
                      onClick={() => handleView(transaction)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="admin-transactions__pagination">
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

      <TransactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTransactionUpdated={handleTransactionUpdated}
        editMode={false}
        transactionData={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;





