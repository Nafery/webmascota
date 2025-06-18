import api from '../api';  // Asegúrate de que `api.js` esté configurado correctamente

// Función para obtener el token desde localStorage
const getToken = () => {
  return localStorage.getItem('authToken'); // Obtener el token desde localStorage
};

// Función para obtener los datos del usuario
export const getUserById = async () => {
  const token = getToken();  // Obtener el token desde localStorage

  if (!token) {
    throw new Error('Usuario no autenticado');  // Si no hay token, el usuario no está autenticado
  }

  try {
    // Obtener el user_id desde el token
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar JWT
    const userId = decodedToken.user_id; // Asumimos que el token contiene el user_id

    // Realizamos la solicitud GET pasando el token en los encabezados y el user_id en la URL
    const response = await api.get(`/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Enviar el token en los encabezados
      },
    });

    return response.data; // Devuelve los datos del usuario
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Error desconocido');
  }
};