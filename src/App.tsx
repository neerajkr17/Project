import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import UserTable from './components/UserCards';
import UserDetails from './components/UserDetails';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Routes>
              <Route path="/" element={<UserTable />} />
              <Route path="/user/:userId" element={<UserDetails />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;