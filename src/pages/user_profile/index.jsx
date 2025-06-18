import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para hacer la redirección
import useUserProfile from '../../hooks/useUserProfile'; // Importamos el hook actualizado
import { UserIcon } from '@heroicons/react/24/outline';

const UserProfilePage = () => {
  const { user, pets, loading, error } = useUserProfile(); // Usamos el hook para obtener los datos del usuario y sus mascotas
  const navigate = useNavigate();  // Inicializa useNavigate para redirigir

  const handlePetClick = (petId) => {
    // Redirigir a la página de detalles de la mascota (consultas de esa mascota)
    navigate(`/pet/${petId}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Mi perfil</h1>

      {/* Mostrar el loading mientras obtenemos los datos */}
      {loading && <p className="text-gray-500">Cargando...</p>}

      {/* Mostrar error si hay un error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Si los datos del usuario están disponibles, los mostramos */}
      {user && !loading && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {/* Usamos el ícono de usuario en lugar de una imagen */}
              <UserIcon className="w-16 h-16 text-gray-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{user.nombre}</h2>
              <p className="text-lg text-gray-600">{user.correo}</p>
              <p className="text-lg text-gray-600">{user.comuna}</p>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar las mascotas del usuario si existen */}
      {pets && !loading && pets.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mascotas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div 
                key={pet.id} 
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-200 cursor-pointer" 
                onClick={() => handlePetClick(pet.id)}  // Llamamos a la función cuando se hace clic
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-xl font-semibold text-gray-900">{pet.nombre}</p>
                    <p className="text-gray-600">{pet.raza}</p>
                    <p className="text-gray-600">{pet.tipo}</p>
                    <p className="text-sm text-gray-500">Edad: {pet.edad}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Si el usuario no tiene mascotas */}
      {pets && !loading && pets.length === 0 && (
        <p className="text-gray-500 mt-4">No pets found for this user</p>
      )}
    </div>
  );
};

export default UserProfilePage;
