import api from '../api';  // Asegúrate de importar la instancia de axios correctamente

export const getPetsByUserId = async (userId) => {
  const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
  
  try {
    // Asegúrate de pasar el token en las cabeceras
    const response = await api.get(`/user/pets/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Incluye el token en las cabeceras
      },
    });

    return response.data; // Retorna los datos de las mascotas
  } catch (error) {
    throw new Error(error.response ? error.response.data.error : 'Error desconocido');
  }
  
};

