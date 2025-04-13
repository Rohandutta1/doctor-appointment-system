import React from 'react';
import { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import AppointmentModal from './AppointmentModal';

export default function CalendarGrid() {
  const { appointments, addAppointment, editAppointment, deleteAppointment } = useAppointments();
  const [selectedDate, setSelectedDate] = useState(null);
  const [editAppt, setEditAppt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const timeSlots = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setEditAppt(null);
    setShowModal(true);
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter((appt) => appt.date === date.toISOString().split('T')[0]);
  };

  const getAppointmentColor = (type) => {
    const colors = {
      emergency: 'bg-purple-500',
      examination: 'bg-yellow-400',
      consultation: 'bg-blue-500',
      routineCheckup: 'bg-red-500',
      sickVisit: 'bg-green-500',
    };
    return colors[type.toLowerCase()] || 'bg-gray-300';
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Doctor Portal</h2>
        <nav>
          <ul className="space-y-2">
            {['Overview', 'Appointments', 'Doctors', 'Pathology Results', 'Chats', 'Account', 'Settings'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded transition duration-200"
                >
                  <span className="mr-2">📋</span> {item}
                </a>
              </li>
            ))}
            <li>
              <a href="#" className="flex items-center p-2 text-gray-600 hover:bg-gray-200 rounded transition duration-200">
                <span className="mr-2">🚪</span> Logout
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-4 text-sm text-gray-500">
          <p>Emergency Numbers:</p>
          <p>+91 8001424197 | +91 9474156662</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
              Day
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
              Week
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200">
              Month
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {new Date(currentYear, currentMonth).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
              >
                Prev
              </button>
              <button
                onClick={nextMonth}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-2">
            <div className="font-semibold text-gray-600">Time</div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="font-semibold text-gray-600 text-center">
                {day}
              </div>
            ))}
            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                <div className="text-gray-500 text-right pr-2">{time}</div>
                {Array.from({ length: 7 }).map((_, i) => {
                  const day = (firstDay + i - (new Date(currentYear, currentMonth, 1).getDay() - 1) + timeSlots.indexOf(time)) % daysInMonth + 1;
                  const date = new Date(currentYear, currentMonth, day);
                  const appts = getAppointmentsForDate(date).filter((appt) => {
                    const apptTime = appt.time.split(':')[0];
                    return apptTime === time.split(':')[0];
                  });

                  return (
                    <div
                      key={`${time}-${i}`}
                      onClick={() => handleDateClick(day)}
                      className="border border-gray-200 p-2 rounded cursor-pointer hover:bg-gray-50 transition duration-200 relative"
                    >
                      {day <= daysInMonth && day > 0 && (
                        <span className="text-sm">{day}</span>
                      )}
                      {appts.map((appt) => (
                        <div
                          key={appt.id}
                          className={`mt-1 p-1 rounded text-white text-xs ${getAppointmentColor(appt.type || 'routineCheckup')} hover:opacity-90 transition duration-200`}
                          style={{ minWidth: '100px' }}
                        >
                          {appt.doctor} - {appt.time}
                          <div className="text-[10px]">{appt.patient}</div>
                        </div>
                      ))}
                      {selectedDate?.getDate() === day && selectedDate.getMonth() === currentMonth && (
                        <button
                          onClick={() => setShowModal(true)}
                          className="absolute top-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full text-[10px] hover:bg-blue-600 transition duration-200"
                        >
                          +
                        </button>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {selectedDate && (
            <div className="mt-4 p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold">
                Appointments for {selectedDate.toDateString()}
              </h3>
              {getAppointmentsForDate(selectedDate).length === 0 ? (
                <p>No appointments</p>
              ) : (
                getAppointmentsForDate(selectedDate).map((appt) => (
                  <div key={appt.id} className="p-2 border-b">
                    <p>
                      <strong>Doctor:</strong> {appt.doctor}
                    </p>
                    <p>
                      <strong>Time:</strong> {appt.time}
                    </p>
                    <p>
                      <strong>Patient:</strong> {appt.patient}
                    </p>
                    <p>
                      <strong>Notes:</strong> {appt.notes || 'None'}
                    </p>
                    <div className="mt-2">
                      <button
                        onClick={() => {
                          setEditAppt(appt);
                          setShowModal(true);
                        }}
                        className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteAppointment(appt.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        {showModal && (
          <AppointmentModal
            date={selectedDate}
            closeModal={() => setShowModal(false)}
            editAppt={editAppt}
          />
        )}
      </main>
    </div>
  );
}