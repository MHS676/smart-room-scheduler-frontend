import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import RoomList from './pages/Rooms/RoomList';
import BookingForm from './components/bookings/BookingForm';
import CalendarView from './components/calendar/CalendarView';
import DashboardLayout from './layouts/DashboardLayout';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <RoomList />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/book"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingForm />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <CalendarView />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
