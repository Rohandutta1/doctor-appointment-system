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
    <nav className="bg-blue-600 p-4 dark:bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Doctor Appointment System</h1>
        <div>
          <button className="mr-4">Home</button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </nav>
  );
}