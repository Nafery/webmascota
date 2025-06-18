import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Para obtener el petId de la URL
import useUserProfile from '../../hooks/useUserProfile'; // Usamos el hook para obtener las mascotas del usuario
import { getAttentionsByPetId } from '../../services/attention_service'; // Importamos el servicio para obtener consultas

const PetDetailsPage = () => {
  const { petId } = useParams(); // Obtener el petId de la URL
  const { user, pets, loading, error } = useUserProfile(); // Obtener los datos del usuario y sus mascotas
  const [pet, setPet] = useState(null); // Para almacenar la mascota seleccionada
  const [attentions, setAttentions] = useState([]); // Para almacenar las consultas de la mascota
  const [errorState, setError] = useState(''); // Para manejar los errores

  // Cargar los detalles de la mascota y sus consultas
  useEffect(() => {
    const fetchPetDetails = () => {
      if (loading) {
        return; // Si aún se están cargando las mascotas, no hacer nada
      }

      if (!pets || pets.length === 0) {
        setError('No pets found for this user');
        return;
      }

      // Buscar la mascota por petId
      const selectedPet = pets.find(pet => pet.id === parseInt(petId)); // Buscar la mascota por petId
      if (selectedPet) {
        setPet(selectedPet);
        
        // Obtener las consultas para la mascota seleccionada
        getAttentionsByPetId(petId)
          .then((data) => setAttentions(data))
          .catch((err) => setError(err.message));
      } else {
        setError('Mascota no encontrada');
      }
    };

    fetchPetDetails();
  }, [petId, pets, loading]);  // Re-fetch cuando el petId o las mascotas cambian

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Detalles de la mascota</h1>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {errorState && <p className="text-red-500">{errorState}</p>}

      {/* Mostrar los detalles de la mascota */}
      {pet && !loading && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{pet.nombre}</h2>
          <p className="text-lg text-gray-600">Raza: {pet.raza}</p>
          <p className="text-lg text-gray-600">Edad: {pet.edad}</p>
          <p className="text-lg text-gray-600">Tipo: {pet.tipo}</p>
        </div>
      )}

      {/* Mostrar las consultas de la mascota */}
      {attentions && !loading && attentions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Consultas</h3>
          <ul>
            {attentions.map((attention) => (
              <li key={attention.id} className="border-b py-3">
                <p className="text-xl text-gray-900">Tipo: {attention.tipo}</p>
                <p className="text-lg text-gray-600">Fecha: {attention.fecha}</p>
                <p className="text-lg text-gray-600">Costo: ${attention.precio}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Si no hay consultas */}
      {attentions && !loading && attentions.length === 0 && (
        <p className="text-gray-500 mt-4">No consultations found for this pet</p>
      )}
    </div>
  );
};

export default PetDetailsPage;

