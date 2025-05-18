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
import FixModal from './FixModal';

// --- STATIC DATA ---
const fixVendorsData = [
  {
    id: 1,
    name: 'Fix Vendor One',
    phone: '+1 555-777-8888',
    gender: 'Male',
    serviceOffered: 'Plumbing',
    dateCreated: '2024-01-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Fix Vendor Two',
    phone: '+1 555-999-0000',
    gender: 'Female',
    serviceOffered: 'Electrical',
    dateCreated: '2024-02-10',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Fix Vendor Three',
    phone: '+1 555-123-7890',
    gender: 'Male',
    serviceOffered: 'Carpentry',
    dateCreated: '2024-02-25',
    status: 'Inactive',
  },
  // Add more sample data as needed
];

const columnHelper = createColumnHelper();

const FixVendors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(fixVendorsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  const handleAddVendor = (newVendor, isEdit = false) => {
    if (isEdit) {
      setData(prev => prev.map(vendor => 
        vendor.id === newVendor.id ? newVendor : vendor
      ));
    } else {
      // For new vendors, generate a temporary ID
      const vendorWithId = {
        ...newVendor,
        id: Math.max(...data.map(v => v.id)) + 1
      };
      setData(prev => [...prev, vendorWithId]);
    }
  };

  const handleEditClick = (vendor) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingVendor(null);
  };

  const columns = React.useMemo(() => [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('gender', {
      header: 'Gender',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('serviceOffered', {
      header: 'Service Offered',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('dateCreated', {
      header: 'Date Created',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`fixvendors__status fixvendors__status--${info.getValue().toLowerCase()}`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: info => {
        const vendor = info.row.original;
        return (
          <div className="fixvendors__actions">
            <button 
              className="fixvendors__action-btn" 
              title="Edit"
              onClick={() => handleEditClick(vendor)}
            >
              <Edit size={16} />
            </button>
            <button className="fixvendors__action-btn" title="Archive">
              <Archive size={16} />
            </button>
            <button className="fixvendors__action-btn fixvendors__action-btn--danger" title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    }),
  ], []); // Remove handleEditClick from dependencies to prevent infinite re-renders

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
    <div className="fixvendors">
      <div className="fixvendors__header">
        <h2 className="fixvendors__title">Fix Vendors Management</h2>
        <div className="fixvendors__actions-bar">
          <div className="fixvendors__actions-bar-left">
            <div className="fixvendors__search">
              <Search size={20} className="fixvendors__search-icon" />
              <input
                type="text"
                placeholder="Search fix vendors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="fixvendors__search-input"
              />
            </div>
          </div>
          <div className="fixvendors__actions-bar-right">
            <button 
              className="fixvendors__add-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus size={20} />
              Add Fix Vendor
            </button>
            <button className="fixvendors__archive-btn">
              <Archive size={20} />
              View Archived
            </button>
          </div>
        </div>
      </div>

      <div className="fixvendors__table-container">
        <table className="fixvendors__table">
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

      <div className="fixvendors__pagination">
        <button
          className="fixvendors__pagination-btn"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="fixvendors__pagination-btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span className="fixvendors__pagination-info">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          className="fixvendors__pagination-btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="fixvendors__pagination-btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>

      <FixModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onVendorAdded={handleAddVendor}
        editMode={!!editingVendor}
        vendorData={editingVendor}
      />
    </div>
  );
};

export default FixVendors;





