// src/router/index.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import AdminDashboard from '../pages/Dashboard/Admin';
import UserDashboard from '../pages/Dashboard/User';
import BookingsPage from '../components/bookings/BookingForm';
import RoomsPage from '../pages/Rooms/Rooms';
import { RoleProtectedRoute } from '../components/shared/RoleProtectedRoute';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';

export const AppRouter: React.FC = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
            <ProtectedRoute>
                <RoleProtectedRoute roles={['ADMIN', 'CEO']}>
                    <AdminDashboard />
                </RoleProtectedRoute>
            </ProtectedRoute>
        } />
        <Route path="/me" element={
            <ProtectedRoute>
                <UserDashboard />
            </ProtectedRoute>
        } />
        <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><RoomsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);
export default AppRouter;
