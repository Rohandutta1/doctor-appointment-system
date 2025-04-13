export default function Sidebar() {
    return (
      <div className="w-64 bg-gray-100 dark:bg-gray-800 h-screen p-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">HealthSync</h1>
        <nav>
          <ul>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Overview</a></li>
            <li className="mb-2"><a href="#" className="text-blue-600 dark:text-blue-400 font-semibold">Appointments</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Doctors</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Pathology Results</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Chats</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Account</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Settings</a></li>
            <li className="mb-2"><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">Logout</a></li>
          </ul>
        </nav>
        <div className="mt-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400">Emergency Hotlines:</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">+24 622 288 7240</p>
        </div>
      </div>
    );
  }