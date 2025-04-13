import { AppointmentProvider } from '../context/AppointmentContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AppointmentProvider>
      <Component {...pageProps} />
    </AppointmentProvider>
  );
}