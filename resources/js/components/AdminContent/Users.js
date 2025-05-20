import React, { useState, useEffect } from 'react';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import UserModal from './UserModal';

const LOCAL_STORAGE_KEY = 'users_data';

const defaultUsers = [
  {
    id: 1,
    name: 'John Doe',
    phone: '+1 234-567-8901',
    gender: 'Male',
    role: 'Customer',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '+1 234-567-8902',
    gender: 'Female',
    role: 'Vendor',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    phone: '+1 234-567-8903',
    gender: 'Male',
    role: 'Admin',
    status: 'Inactive',
  },
];

const columnHelper = createColumnHelper();

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedUsers) {
      setData(JSON.parse(storedUsers));
    } else {
      setData(defaultUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const handleAddUser = (newUser, isEdit = false) => {
    if (isEdit) {
      setData(prev =>
        prev.map(user =>
          user.id === newUser.id
            ? {
                ...user,
                ...newUser,
                name: `${newUser.first_name} ${newUser.last_name}`.trim(),
              }
            : user
        )
      );
    } else {
      const newId = data.length > 0 ? Math.max(...data.map(u => u.id)) + 1 : 1;
      const userToAdd = {
        id: newId,
        name: `${newUser.first_name} ${newUser.last_name}`.trim(),
        phone: newUser.phone,
        gender: newUser.gender,
        role: newUser.role,
        status: newUser.status,
      };
      setData(prev => [...prev, userToAdd]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = userId => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setData(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleEditClick = user => {
    const [first_name, ...lastParts] = user.name.split(' ');
    const last_name = lastParts.join(' ');
    setEditingUser({
      ...user,
      first_name,
      last_name,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const columns = React.useMemo(
    () => [
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
                onClick={e => {
                  e.stopPropagation();
                  handleEditClick(user);
                }}
              >
                <Edit size={16} />
              </button>
              <button
                className="users__action-btn users__action-btn--danger"
                title="Delete"
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteUser(user.id);
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        },
      }),
    ],
    []
  );

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
            <button className="users__add-btn" onClick={() => setIsModalOpen(true)}>
              <UserPlus size={20} />
              Add User
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
                    {flexRender(header.column.columnDef.header, header.getContext())}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
