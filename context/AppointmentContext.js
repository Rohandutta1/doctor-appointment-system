import { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments([...appointments, { id: Date.now(), ...appointment }]);
  };

  const editAppointment = (id, updatedAppointment) => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === id ? { ...appt, ...updatedAppointment } : appt
      )
    );
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment, editAppointment, deleteAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);