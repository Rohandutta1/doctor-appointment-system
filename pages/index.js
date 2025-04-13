import Navbar from '../components/Navbar';
import CalendarGrid from '../components/CalendarGrid';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <CalendarGrid />
    </div>
  );
}