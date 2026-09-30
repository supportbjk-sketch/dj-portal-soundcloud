import React from 'react';
import { Navigate } from 'react-router-dom';
import { canUpload, isAdmin, isAuthenticated } from '../lib/auth';

export default function ProtectedRoute({ children, type }) {
  if (type === 'approved') {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    if (!canUpload()) {
      return <Navigate to="/" replace />;
    }
  }

  if (type === 'admin') {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />;
    }
    if (!isAdmin()) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
