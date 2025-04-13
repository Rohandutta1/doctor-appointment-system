import { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';

export default function AppointmentModal({ date, closeModal, editAppt }) {
  const { addAppointment, editAppointment } = useAppointments();
  const [formData, setFormData] = useState(
    editAppt || {
      doctor: '',
      time: '',
      patient: '',
      notes: '',
      type: 'routineCheckup',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = { ...formData, date: date.toISOString().split('T')[0] };
    if (editAppt) {
      editAppointment(editAppt.id, appointment);
      alert('Appointment updated successfully!');
    } else {
      addAppointment(appointment);
      alert('Appointment booked successfully!');
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editAppt ? 'Edit Appointment' : 'Book Appointment'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <input
              type="text"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Patient</label>
            <input
              type="text"
              value={formData.patient}
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="routineCheckup">Routine Checkup</option>
              <option value="emergency">Emergency</option>
              <option value="examination">Examination</option>
              <option value="consultation">Consultation</option>
              <option value="sickVisit">Sick Visit</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              {editAppt ? 'Update' : 'Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}