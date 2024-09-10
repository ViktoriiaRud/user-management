import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchUsers, filterUsers, User } from '../redux/userSlice';
import { HiUser, HiUserCircle, HiMail, HiPhone } from 'react-icons/hi';


const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, status, error } = useSelector((state: RootState) => state.users);
  const [filters, setFilters] = useState({ name: '', username: '', email: '', phone: '' });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    dispatch(filterUsers({ ...filters, [name]: value }));
  };

  if (status === 'loading')
    return <div className='text-center py-4'>Loading...</div>;
  if (status === 'failed')
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className='bg-gray-100 min-h-screen py-8'>
          <h1 className='text-gray-900 text-4xl font-mono font-bold tracking-wider text-center py-4'>User Management</h1>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg      overflow-hidden'>
        <div className='p-4 space-y-4'>
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filters.name}
          onChange={handleFilterChange}
          className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-colors'
        />
        <input
          type="text"
          name="username"
          placeholder="Filter by username"
          value={filters.username}
          onChange={handleFilterChange}
          className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-colors'
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filters.email}
          onChange={handleFilterChange}
          className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-colors'
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by phone"
          value={filters.phone}
          onChange={handleFilterChange}
          className='w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-colors'
        />
       </div>
       <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-50'>
            <th className='bg-blue-400 px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b'>
                  <div className='flex items-center space-x-1'>
                    <HiUser className='w-4 h-4' />
                    <span>Name</span>
                  </div>
                </th>
            {/* <th className='bg-green-500'>Username</th> */}
            <th className='bg-green-500 px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b'>
                  <div className='flex items-center space-x-1'>
                    <HiUserCircle className='w-4 h-4' />
                    <span>Username</span>
                  </div>
                </th>
            <th className='bg-orange-400 px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b'>
                  <div className='flex items-center space-x-1'>
                    <HiMail className='w-4 h-4' />
                    <span>Email</span>
                  </div>
                </th>
            <th className='bg-rose-300 px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider border-b'>
                  <div className='flex items-center space-x-1'>
                    <HiPhone className='w-4 h-4' />
                    <span>Phone</span>
                  </div>
                </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {filteredUsers.map((user: User) => (
            <tr key={user.id} className='hover:bg-gray-100'>
                  <td className='border-2 border-inherit px-6 py-4 whitespace-nowrap text-sm
                  text-gray-900'>{user.name}</td>
                  <td className='border-2 border-inherit px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.username}</td>
                  <td className='border-2 border-inherit px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.email}</td>
                  <td className='border-2 border-inherit px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};


export default UserTable;
