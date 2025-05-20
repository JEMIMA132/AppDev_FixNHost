import React, { useState, useRef } from 'react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const printRef = useRef();

  // Static data for orders
  const orders = [
    {
      id: 1,
      date: '2024-03-15',
      transaction_id: 'ORD-1001',
      customer_name: 'John Doe',
      amount: 299.99,
      payment_method: 'Credit Card',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-03-14',
      transaction_id: 'ORD-1002',
      customer_name: 'Jane Smith',
      amount: 149.50,
      payment_method: 'PayPal',
      status: 'Processing'
    },
    {
      id: 3,
      date: '2024-03-13',
      transaction_id: 'ORD-1003',
      customer_name: 'Mike Johnson',
      amount: 499.99,
      payment_method: 'Credit Card',
      status: 'Completed'
    }
  ];

  // Static data for product sales
  const productSales = [
    {
      id: 1,
      product_name: 'Laptop Pro X1',
      total_quantity: 15,
      total_sales: 14999.85
    },
    {
      id: 2,
      product_name: 'Wireless Mouse',
      total_quantity: 50,
      total_sales: 2499.50
    },
    {
      id: 3,
      product_name: 'Mechanical Keyboard',
      total_quantity: 25,
      total_sales: 3749.75
    }
  ];

  // Helper function to safely extract order ID from transaction_id
  const extractOrderId = (transactionId) => {
    if (!transactionId) return 'N/A';
    
    // Check if it starts with ORD- prefix
    if (typeof transactionId === 'string' && transactionId.startsWith('ORD-')) {
      const numericPart = transactionId.replace('ORD-', '');
      // Make sure the remaining part is a valid number
      if (!isNaN(numericPart) && numericPart.trim() !== '') {
        return numericPart;
      }
    }
    
    // If we have a raw order_id, use that directly
    if (typeof transactionId === 'number') {
      return transactionId.toString();
    }
    
    // Fallback to using the transaction_id as is
    return transactionId;
  };

  const handlePrint = () => {
    // Add print-only class to the table container
    const tableContainer = printRef.current;
    if (tableContainer) {
      tableContainer.classList.add('print-only');
      
      // Set document title for the PDF
      const originalTitle = document.title;
      document.title = activeTab === 'orders' ? 'Orders Report' : 'Product Sales Report';
      
      // Trigger print
      window.print();
      
      // Reset after printing
      setTimeout(() => {
        tableContainer.classList.remove('print-only');
        document.title = originalTitle;
      }, 100);
    }
  };

  return (
    <div className="reports">
      <div className="reports__header no-print">
        <h2 className="reports__title">Reports</h2>
        <div className="reports__tabs">
          <button className={`reports__tab${activeTab === 'orders' ? ' active' : ''}`} onClick={() => setActiveTab('orders')}>Orders Report</button>
          <button className={`reports__tab${activeTab === 'product-sales' ? ' active' : ''}`} onClick={() => setActiveTab('product-sales')}>Product Sales Report</button>
        </div>
        <button className="reports__print-save" onClick={handlePrint}>
          Print / Save PDF
        </button>
      </div>
      {activeTab === 'orders' && (
        <div className="reports__table-section" ref={printRef}>
          <div className="reports__table-header">
            <div className="reports__print-title">
              <h1>Order Report Table</h1>
              <p>All orders with details</p>
            </div>
          </div>
          <div className="reports__table-container">
            <table className="reports__table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction ID</th>
                  <th>Customer Name</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((row) => (
                    <tr key={row.id}>
                      <td>{row.date}</td>
                      <td>{extractOrderId(row.transaction_id || row.order_id)}</td>
                      <td>{row.customer_name}</td>
                      <td>${parseFloat(row.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td>{row.payment_method}</td>
                      <td>{row.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === 'product-sales' && (
        <div className="reports__table-section" ref={printRef}>
          <div className="reports__table-header">
            <div className="reports__print-title">
              <h1>Product Sales Report</h1>
              <p>Aggregated sales by product</p>
            </div>
          </div>
          <div className="reports__table-container">
            <table className="reports__table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Total Quantity Sold</th>
                  <th>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {productSales.length > 0 ? (
                  productSales.map((row) => (
                    <tr key={row.id}>
                      <td>{row.product_name}</td>
                      <td>{row.total_quantity}</td>
                      <td>${parseFloat(row.total_sales).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;