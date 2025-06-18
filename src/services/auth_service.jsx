// src/services/authService.js

import api from '../api';  // Importa el cliente de axios

// Método para iniciar sesión
export const loginUser = async (correo, password) => {
  try {
    const response = await api.post('/login', {
      correo,
      password,
    });

    // Suponiendo que la respuesta contiene un token o datos del usuario
    localStorage.setItem('authToken', response.data.token); // Guardar token en localStorage

    return response.data; // Devuelve los datos del usuario en caso de éxito
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Error al iniciar sesión');
    } else {
      throw new Error('Error desconocido');
    }
  }
};

// Método para hacer logout
export const logoutUser = () => {
  localStorage.removeItem('authToken'); // Eliminar token de localStorage
};
