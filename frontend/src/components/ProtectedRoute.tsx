import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

interface ProtectedRouteProps {
  children: React.ReactElement; 
}

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); 
  } catch (err) {
    return false;
  }
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
