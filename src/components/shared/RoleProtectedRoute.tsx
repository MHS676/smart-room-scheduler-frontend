// src/components/shared/RoleProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

type Props = { children: React.ReactNode; roles?: string[] };

export const RoleProtectedRoute: React.FC<Props> = ({ children, roles }) => {
    const { token, user } = useAuth();
    if (!token) return <Navigate to="/login" replace />;
    if (roles && roles.length > 0) {
        if (!user) return <Navigate to="/login" replace />;
        if (!roles.includes(user.role.toLowerCase()) && !roles.includes(user.role.toUpperCase())) {
            // role mismatch
            return <div className="p-6">Access denied — insufficient permissions.</div>;
        }
    }
    return <>{children}</>;
};

export default RoleProtectedRoute;
