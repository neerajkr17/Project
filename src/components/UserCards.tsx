import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const UserCards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { users, status } = useSelector((state: RootState) => state.users);
  const { searchQuery, selectedCity } = useSelector((state: RootState) => state.filters);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter(user => {
    const matchesCity = selectedCity ? user.address.city === selectedCity : true;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  if (status === 'loading') return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-600 text-xl">Loading...</p>
    </div>
  );

  if (status === 'failed') return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-600 text-xl">Failed to fetch users.</p>
    </div>
  );

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {filteredUsers.map(user => (
        <div 
          key={user.id} 
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">{user.name}</h3>
          <p className="text-center text-gray-600 text-sm mb-3">
            {user.address.street}, {user.address.suite}, {user.address.city} - {user.address.zipcode}
          </p>
          <div className="mb-3">
            <p className="text-sm"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm"><strong>Phone:</strong> {user.phone}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => navigate(`/user/${user.id}`)}
              className="bg-blue-600 text-white px-3 py-2 text-sm rounded hover:bg-blue-700 transition-colors duration-300"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
      {filteredUsers.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-600 text-xl">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserCards;