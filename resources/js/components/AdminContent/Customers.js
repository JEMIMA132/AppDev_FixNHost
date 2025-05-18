import React, { useState } from 'react';
import { UserPlus, Search, Archive, Edit, Trash2 } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import CustomerModal from './CustomerModal';

// --- STATIC DATA ---
const customersData = [
  {
    id: 1,
    first_name: 'Alice',
    last_name: 'Brown',
    phone: '+1 555-123-4567',
    email: 'alice@example.com',
    gender: 'Female',
    address: '123 Main St, City',
    dateCreated: '2024-01-10',
    status: 'Active',
  },
  {
    id: 2,
    first_name: 'Bob',
    last_name: 'White',
    phone: '+1 555-987-6543',
    email: 'bob@example.com',
    gender: 'Male',
    address: '456 Oak Ave, Town',
    dateCreated: '2024-02-05',
    status: 'Active',
  },
  {
    id: 3,
    first_name: 'Carol',
    last_name: 'Green',
    phone: '+1 555-222-3333',
    email: 'carol@example.com',
    gender: 'Female',
    address: '789 Pine Rd, Village',
    dateCreated: '2024-02-20',
    status: 'Inactive',
  },
  // Add more sample data as needed
];

const columnHelper = createColumnHelper();

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(customersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleAddCustomer = (newCustomer, isEdit = false) => {
    if (isEdit) {
      setData(prev => prev.map(customer => 
        customer.id === newCustomer.id ? newCustomer : customer
      ));
    } else {
      // For new customers, generate a temporary ID
      const customerWithId = {
        ...newCustomer,
        id: Math.max(...data.map(c => c.id)) + 1
      };
      setData(prev => [...prev, customerWithId]);
    }
  };

  const handleEditClick = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const columns = React.useMemo(() => [
    columnHelper.accessor(row => `${row.first_name} ${row.last_name}`, {
      id: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('dateCreated', {
      header: 'Date Created',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`customers__status customers__status--${info.getValue().toLowerCase()}`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: info => {
        const customer = info.row.original;
        return (
          <div className="customers__actions">
            <button 
              className="customers__action-btn" 
              title="Edit"
              onClick={() => handleEditClick(customer)}
            >
              <Edit size={16} />
            </button>
            <button className="customers__action-btn" title="Archive">
              <Archive size={16} />
            </button>
            <button className="customers__action-btn customers__action-btn--danger" title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: searchQuery,
    },
    onGlobalFilterChange: setSearchQuery,
  });

  return (
    <div className="customers">
      <div className="customers__header">
        <h2 className="customers__title">Customer Management</h2>
        <div className="customers__actions-bar">
          <div className="customers__actions-bar-left">
            <div className="customers__search">
              <Search size={20} className="customers__search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="customers__search-input"
              />
            </div>
          </div>
          <div className="customers__actions-bar-right">
            <button 
              className="customers__add-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus size={20} />
              Add Customer
            </button>
            <button className="customers__archive-btn">
              <Archive size={20} />
              View Archived
            </button>
          </div>
        </div>
      </div>

      <div className="customers__table-container">
        <table className="customers__table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
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
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="customers__pagination-btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
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
          {'>'}
        </button>
        <button
          className="customers__pagination-btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCustomerAdded={handleAddCustomer}
        editMode={!!editingCustomer}
        customerData={editingCustomer}
      />
    </div>
  );
};

export default Customers;





