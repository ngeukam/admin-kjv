import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Récupérer le token ou état de connexion (à adapter selon votre logique)
  const token = localStorage.getItem("token");

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, affichez la route protégée
  return children;
};

export default ProtectedRoute;
