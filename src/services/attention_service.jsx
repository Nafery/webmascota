import api from '../api'; // Asegúrate de importar la instancia de axios correctamente

// Función para obtener las consultas de una mascota por su ID
export const getAttentionsByPetId = async (petId) => {
    const token = localStorage.getItem('authToken'); // Obtener el token del localStorage
    
    if (!token) {
      throw new Error('Token no encontrado');
    }
  
    try {
      // Realiza la solicitud GET al endpoint de la API, pasando el token en las cabeceras
      const response = await api.get(`/pets/${petId}/attentions`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Incluir el token en las cabeceras
        },
      });
  
      // Si la respuesta es exitosa, retorna los datos
      return response.data;
    } catch (error) {
      // Si hay un error, lanzamos un error con el mensaje
      throw new Error(error.response ? error.response.data.error : 'Error desconocido');
    }
};

// Función para crear una nueva consulta
export const createAttention = async (tipo, fecha, precio, mascota_id) => {
    const token = localStorage.getItem('authToken'); // Obtener el token desde localStorage
  
    if (!token) {
      throw new Error('Token no encontrado');
    }
  
    try {
      // Realiza la solicitud POST al endpoint de la API, pasando el token en las cabeceras
      const response = await api.post(`/attentions`, {
        tipo,
        fecha,
        precio,
        mascota_id,  // Enviar el id de la mascota
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Incluir el token en las cabeceras
        },
      });
  
      return response.data;  // Devuelve la respuesta del servidor
    } catch (error) {
      // Si hay un error, lanzamos un error con el mensaje
      throw new Error(error.response ? error.response.data.error : 'Error al crear la consulta');
    }
  };
  
