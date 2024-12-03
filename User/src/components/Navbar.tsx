import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUsers } from '../store/userSlice';
import { setSearchQuery, setSelectedCity } from '../store/filterSlice';

const Navbar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.users);
  const { searchQuery, selectedCity } = useSelector((state: RootState) => state.filters);
  const [cityList, setCityList] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  
  useEffect(() => {
    if (users.length > 0) {
      const uniqueCities = Array.from(new Set(users.map(user => user.address.city)));
      setCityList(uniqueCities);
    }
  }, [users]);

  const handleCityChange = (city: string) => {
    dispatch(setSelectedCity(city));
    setIsMenuOpen(false);
  };

  const handleSearchChange = (search: string) => {
    dispatch(setSearchQuery(search));
  };

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="relative">
      
      <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white py-4 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">User Management</h1>

          
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={selectedCity}
              onChange={e => handleCityChange(e.target.value)}
            >
              <option value="">All Cities</option>
              {cityList.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="bg-gray-700 text-white px-4 py-2 rounded"
              placeholder="Search by name"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
      </nav>

      
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        >
          <div 
            className="absolute top-16 left-0 w-full bg-gray-800 text-white p-4 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="space-y-4">
              <select
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                value={selectedCity}
                onChange={e => handleCityChange(e.target.value)}
              >
                <option value="">All Cities</option>
                {cityList.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded"
                placeholder="Search by name"
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}


      <div className="mt-20 px-4 sm:px-6 lg:px-8">
      </div>

    </div>
  );
};

export default Navbar;