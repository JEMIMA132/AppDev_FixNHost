import React, { useState } from 'react';
import { UserPlus, Search, Archive, Edit, Trash2, MoreVertical } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import UserModal from './UserModal';

// --- STATIC DATA ---
const usersData = [
  {
    id: 1,
    name: 'John Doe',
    phone: '+1 234-567-8901',
    gender: 'Male',
    dateCreated: '2024-01-15',
    role: 'Customer',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '+1 234-567-8902',
    gender: 'Female',
    dateCreated: '2024-02-01',
    role: 'Vendor',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    phone: '+1 234-567-8903',
    gender: 'Male',
    dateCreated: '2024-02-15',
    role: 'Admin',
    status: 'Inactive',
  },
  // Add more sample data as needed
];

const columnHelper = createColumnHelper();

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(usersData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (newUser, isEdit = false) => {
    if (isEdit) {
      setData(prev => prev.map(user => 
        user.id === newUser.id ? newUser : user
      ));
    } else {
      setData(prev => [...prev, newUser]);
    }
  };

  const handleEditClick = (user) => {
    console.log('Edit clicked:', user);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
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
    columnHelper.accessor('dateCreated', {
      header: 'Date Created',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => (
        <span className={`users__role users__role--${info.getValue().toLowerCase()}`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`users__status users__status--${info.getValue().toLowerCase()}`}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('id', {
      header: 'Actions',
      cell: info => {
        const user = info.row.original;
        return (
          <div className="users__actions">
            <button 
              className="users__action-btn" 
              title="Edit"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Edit button clicked for user:', user);
                handleEditClick(user);
              }}
            >
              <Edit size={16} />
            </button>
            <button className="users__action-btn" title="Archive">
              <Archive size={16} />
            </button>
            <button className="users__action-btn users__action-btn--danger" title="Delete">
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

  React.useEffect(() => {
    console.log('Modal state:', { isModalOpen, editingUser });
  }, [isModalOpen, editingUser]);

  return (
    <div className="users">
      <div className="users__header">
        <h2 className="users__title">User Management</h2>
        <div className="users__actions-bar">
          <div className="users__actions-bar-left">
            <div className="users__search">
              <Search size={20} className="users__search-icon" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="users__search-input"
              />
            </div>
          </div>
          <div className="users__actions-bar-right">
            <button 
              className="users__add-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <UserPlus size={20} />
              Add User
            </button>
            <button className="users__archive-btn">
              <Archive size={20} />
              View Archived
            </button>
          </div>
        </div>
      </div>

      <div className="users__table-container">
        <table className="users__table">
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

      <div className="users__pagination">
        <button
          className="users__pagination-btn"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="users__pagination-btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <span className="users__pagination-info">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          className="users__pagination-btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="users__pagination-btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUserAdded={handleAddUser}
        editMode={!!editingUser}
        userData={editingUser}
      />
    </div>
  );
};

export default Users;
