import React, { useState, useEffect, useMemo } from 'react';
import { UserPlus, Search, Archive, Edit, Trash2, RotateCcw } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import CustomerModal from './CustomerModal';

// Load customers from localStorage or fallback to static data
const getStoredCustomers = () => {
  const stored = localStorage.getItem('customersData');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
};

const Customers = () => {
  const [data, setData] = useState(() => getStoredCustomers());
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customersData', JSON.stringify(data));
  }, [data]);

  // Filtered data based on search and archived toggle
  const filteredData = useMemo(() => {
    return data.filter((cust) => {
      const matchesArchived = showArchived ? cust.status === 'Archived' : cust.status !== 'Archived';
      if (!matchesArchived) return false;

      if (!searchQuery.trim()) return true;

      const lowerQuery = searchQuery.toLowerCase();

      return (
        cust.first_name.toLowerCase().includes(lowerQuery) ||
        cust.last_name.toLowerCase().includes(lowerQuery) ||
        cust.phone.toLowerCase().includes(lowerQuery) ||
        (cust.email && cust.email.toLowerCase().includes(lowerQuery))
      );
    });
  }, [data, searchQuery, showArchived]);

  // Table columns
  const columnHelper = createColumnHelper();

  const columns = useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info) => {
        const { first_name, middle_name, last_name, suffix } = info.row.original;
        return [first_name, middle_name, last_name, suffix].filter(Boolean).join(' ');
      },
    },
    columnHelper.accessor('phone', {
      header: 'Phone',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('dateCreated', {
      header: 'Date Created',
      cell: (info) => info.getValue(),
    }),
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info) => {
        const status = info.row.original.status;
        return (
          <span className={`customers__status ${status === 'Active' ? 'customers__status--active' : 'customers__status--inactive'}`}>
            {status === 'Active' ? 'Active' : status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const customer = row.original;
        return (
          <div className="customers__actions">
            <button
              title="Edit Customer"
              className="customers__action-btn"
              onClick={() => handleEditCustomer(customer)}
            >
              <Edit size={16} />
            </button>
            {showArchived ? (
              <button
                title="Restore Customer"
                className="customers__action-btn"
                onClick={() => handleArchiveCustomer(customer.id)}
              >
                <RotateCcw size={16} />
              </button>
            ) : (
              <button
                title="Archive Customer"
                className="customers__action-btn"
                onClick={() => handleArchiveCustomer(customer.id)}
              >
                <Archive size={16} />
              </button>
            )}
            <button
              title="Delete Customer"
              className="customers__action-btn customers__action-btn--danger"
              onClick={() => handleDeleteCustomer(customer.id)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ], [data, showArchived]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handlers
  const handleAddCustomerClick = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setData((prev) => prev.filter((cust) => cust.id !== id));
    }
  };

  const handleArchiveCustomer = (id) => {
    setData((prev) =>
      prev.map((cust) =>
        cust.id === id ? { ...cust, status: cust.status === 'Archived' ? 'Active' : 'Archived' } : cust
      )
    );
  };

  // Save customer for add or edit
  const handleSaveCustomer = (customerData, editMode) => {
    if (editMode) {
      setData((prev) =>
        prev.map((cust) => (cust.id === customerData.id ? { ...customerData } : cust))
      );
    } else {
      const newCustomer = {
        ...customerData,
        id: Date.now().toString(), // unique id
        dateCreated: new Date().toISOString().split('T')[0],
      };
      setData((prev) => [newCustomer, ...prev]);
    }
  };

  return (
    <>
      <div className="customers">
        <div className="customers__header">
          <h2 className="customers__title">Customer Management</h2>
          <div className="customers__actions-bar">
            <div className="customers__actions-bar-left">
              <div className="customers__search">
                <Search size={20} className="customers__search-icon" />
                <input
                  type="text"
                  className="customers__search-input"
                  placeholder="Search customers..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
              </div>
            </div>
            <div className="customers__actions-bar-right">
              <button className="customers__add-btn" onClick={handleAddCustomerClick}>
                <UserPlus size={20} />
                <span style={{ marginLeft: 8 }}>Add Customer</span>
              </button>
              <button className="customers__archive-btn" onClick={() => setShowArchived((v) => !v)}>
                <Archive size={18} style={{ marginRight: 6 }} />
                <span>{showArchived ? 'View Active' : 'View Archived'}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="customers__table-container">
          <table className="customers__table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length} style={{ textAlign: 'center', padding: '1rem' }}>
                    No customers found.
                  </td>
                </tr>
              )}
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="customers__pagination">
          <button
            className="customers__pagination-btn"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span className="customers__pagination-info">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <button
            className="customers__pagination-btn"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveCustomer={handleSaveCustomer}
        editMode={!!editingCustomer}
        customerData={editingCustomer}
      />
    </>
  );
};

export default Customers;

