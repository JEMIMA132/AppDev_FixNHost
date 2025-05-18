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
import HostModal from './HostModal';

// --- STATIC DATA ---
const hostVendorsData = [
  {
    id: 1,
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    gender: 'Male',
    serviceOffered: 'Event Hosting',
    dateCreated: '2024-02-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    gender: 'Female',
    serviceOffered: 'Wedding Planning',
    dateCreated: '2024-02-14',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Michael Brown',
    phone: '+1 (555) 456-7890',
    gender: 'Male',
    serviceOffered: 'Conference Management',
    dateCreated: '2024-02-13',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Emily Davis',
    phone: '+1 (555) 234-5678',
    gender: 'Female',
    serviceOffered: 'Party Planning',
    dateCreated: '2024-02-12',
    status: 'Active',
  },
  {
    id: 5,
    name: 'David Wilson',
    phone: '+1 (555) 876-5432',
    gender: 'Male',
    serviceOffered: 'Corporate Events',
    dateCreated: '2024-02-11',
    status: 'Active',
  },
];

const columnHelper = createColumnHelper();

const HostVendors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(hostVendorsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);

  const handleAddVendor = (newVendor, isEdit = false) => {
    if (isEdit) {
      setData(prev => prev.map(vendor => 
        vendor.id === newVendor.id ? newVendor : vendor
      ));
    } else {
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
        <span className={`hostvendors__status hostvendors__status--${info.getValue().toLowerCase()}`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: info => {
        const vendor = info.row.original;
        return (
          <div className="hostvendors__actions">
            <button 
              className="hostvendors__action-btn" 
              title="Edit"
              onClick={() => handleEditClick(vendor)}
            >
              <Edit size={16} />
            </button>
            <button className="hostvendors__action-btn" title="Archive">
              <Archive size={16} />
            </button>
            <button className="hostvendors__action-btn hostvendors__action-btn--danger" title="Delete">
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
    <div className="hostvendors">
      <div className="hostvendors__header">
        <h2 className="hostvendors__title">Host Vendors Management</h2>
        <div className="hostvendors__actions-bar">
          <div className="hostvendors__actions-bar-left">
            <div className="hostvendors__search">
              <Search size={20} className="hostvendors__search-icon" />
              <input
                type="text"
                placeholder="Search host vendors..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="hostvendors__search-input"
              />
            </div>
          </div>
          <div className="hostvendors__actions-bar-right">
            <button 
              className="hostvendors__add-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus size={20} />
              Add Host Vendor
            </button>
            <button className="hostvendors__archive-btn">
              <Archive size={20} />
              View Archived
            </button>
          </div>
        </div>
      </div>

      <div className="hostvendors__table-container">
        <table className="hostvendors__table">
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

      <div className="hostvendors__pagination">
        <button
          className="hostvendors__pagination-btn"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="hostvendors__pagination-btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span className="hostvendors__pagination-info">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          className="hostvendors__pagination-btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="hostvendors__pagination-btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>

      <HostModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onVendorAdded={handleAddVendor}
        editMode={!!editingVendor}
        vendorData={editingVendor}
      />
    </div>
  );
};

export default HostVendors;
