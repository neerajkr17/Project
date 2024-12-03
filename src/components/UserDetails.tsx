import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers, User } from '../store/userSlice';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { users, status } = useSelector((state: RootState) => state.users);

  
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

  
  const user: User | undefined = users.find(user => user.id === Number(userId));

  if (status === 'loading') return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-600 text-xl">Loading...</p>
    </div>
  );

  if (status === 'failed') return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-600 text-xl">Failed to fetch user details.</p>
    </div>
  );

  if (!user) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-600 text-xl">User not found.</p>
    </div>
  );

  return (
    <div className="p-4 max-w-md sm:max-w-lg mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-3 py-2 text-sm rounded hover:bg-gray-300"
      >
        Back
      </button>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{user.company.name}</p>
        </div>
        <div className="space-y-2 text-sm sm:text-base">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          
          <h3 className="text-base sm:text-lg font-semibold mt-4">Address</h3>
          <p>{`${user.address.street}, ${user.address.suite}`}</p>
          <p>{`${user.address.city} - ${user.address.zipcode}`}</p>
          
          <h3 className="text-base sm:text-lg font-semibold mt-4">Company</h3>
          <p><strong>Name:</strong> {user.company.name}</p>
          <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
          <p><strong>Business:</strong> {user.company.bs}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;