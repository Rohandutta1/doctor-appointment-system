import { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import AppointmentModal from './AppointmentModal';

export default function CalendarGrid() {
  const { appointments, deleteAppointment } = useAppointments();
  const [selectedDate, setSelectedDate] = useState(null);
  const [editAppt, setEditAppt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

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
    return appointments.filter(
      (appt) => appt.date === date.toISOString().split('T')[0]
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-600 text-white rounded">
          Prev
        </button>
        <h2 className="text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-600 text-white rounded">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const date = new Date(currentYear, currentMonth, day);
          const appts = getAppointmentsForDate(date);
          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className="p-2 border rounded cursor-pointer hover:bg-blue-100"
            >
              {day}
              {appts.length > 0 && (
                <div className="text-xs text-blue-600">{appts.length} appt(s)</div>
              )}
            </div>
          );
        })}
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
                    className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAppointment(appt.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {showModal && (
        <AppointmentModal
          date={selectedDate}
          closeModal={() => setShowModal(false)}
          editAppt={editAppt}
        />
      )}
    </div>
  );
}