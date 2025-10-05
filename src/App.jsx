import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateTrip from './pages/CreateTrip.jsx';
import TripDetail from './pages/TripDetail.jsx';
import ShareTrip from './pages/ShareTrip.jsx';

function App() {
  const location = useLocation();

  // Hide nav if route starts with /share/
  const hideNav = location.pathname.startsWith("/share/");

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      {!hideNav && (
        <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 px-10 py-4 flex items-center">
          <Link
            to="/"
            className="mr-6 text-gray-800 font-medium text-lg hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/create"
            className="text-gray-800 font-medium text-lg hover:text-blue-600 transition-colors"
          >
            Create Trip
          </Link>
        </nav>
      )}

      {/* Page content */}
      <div className="max-w-6xl mx-auto p-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTrip />} />
          <Route path="/trip/:id" element={<TripDetail />} />
          <Route path="/share/:token" element={<ShareTrip />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
