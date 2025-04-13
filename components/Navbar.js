import { useState, useEffect } from 'react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          {/* Logo Placeholder */}
          RD
        </div>
        <input
          type="text"
          placeholder="Search pathology results..."
          className="p-2 border border-gray-300 rounded w-64 focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Rohan Dutta</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            {/* User Avatar Placeholder */}
            R
          </div>
        </div>
      </div>
    </nav>
  );
}