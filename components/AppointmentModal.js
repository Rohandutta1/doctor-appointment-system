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
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = { ...formData, date: date.toISOString().split('T')[0] };
    if (editAppt) {
      editAppointment(editAppt.id, appointment);
    } else {
      addAppointment(appointment);
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {editAppt ? 'Edit Appointment' : 'Book Appointment'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Doctor</label>
            <input
              type="text"
              value={formData.doctor}
              onChange={(e) =>
                setFormData({ ...formData, doctor: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              value={formData.patient}
              onChange={(e) =>
                setFormData({ ...formData, patient: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editAppt ? 'Update' : 'Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}