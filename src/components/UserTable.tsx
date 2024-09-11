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
    <div className='bg-gray-600 min-h-screen py-8'>
          <h1 className='text-white text-4xl font-mono font-bold tracking-wider text-center py-4'>User Management</h1>
          <div className='flex items-center justify-center gap-5 flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-500 dark:bg-gray-900'>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          className='w-30 p-2 px-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        </div>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
          type="text"
          name="username"
          placeholder="Username"
          value={filters.username}
          onChange={handleFilterChange}
          className='w-30 p-2 px-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        </div>
        <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
          type="text"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleFilterChange}
          className='w-30 p-2 px-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        </div>
        <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={filters.phone}
          onChange={handleFilterChange}
          className='w-30 p-2 px-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
        />
        </div>
       </div>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg      overflow-hidden'>
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
