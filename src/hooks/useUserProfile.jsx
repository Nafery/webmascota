import { useState, useEffect } from 'react';
import { getUserById } from '../services/user_service'; // Importamos el servicio de usuario
import { getPetsByUserId } from '../services/pet_service'; // Importamos el servicio de mascotas

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Primero, obtenemos los datos del usuario
        const userData = await getUserById(); // Esto debe devolver los datos del usuario
        setUser(userData);

        // Luego, obtenemos las mascotas del usuario
        const petsData = await getPetsByUserId(userData.id); // Pasamos el user_id para obtener las mascotas
        setPets(petsData);

      } catch (err) {
        setError(err.message); // Manejo de errores
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile(); // Llamamos a la función de carga al montar el componente
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return { user, pets, loading, error };
};

export default useUserProfile;
