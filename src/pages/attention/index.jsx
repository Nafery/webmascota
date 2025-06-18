import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Eliminamos useParams porque ya no necesitamos el petId de la URL
import { createAttention } from '../../services/attention_service'; // Importamos el servicio para crear la consulta
import useUserProfile from '../../hooks/useUserProfile'; // Usamos el hook para obtener las mascotas del usuario

const CreateAttentionPage = () => {
  const { pets, loading, error } = useUserProfile(); // Obtenemos las mascotas del usuario a través del hook
  const navigate = useNavigate(); // Para redirigir después de la acción

  const [tipo, setTipo] = useState(''); // Estado para el tipo de consulta
  const [fecha, setFecha] = useState(''); // Estado para la fecha y hora
  const [precio, setPrecio] = useState(''); // Estado para el precio
  const [mascotaId, setMascotaId] = useState(''); // Estado para el id de la mascota
  const [loadingForm, setLoadingForm] = useState(false); // Estado de carga
  const [errorState, setError] = useState(''); // Estado para manejar errores
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  // Set precio según el tipo de consulta seleccionado
  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setTipo(selectedTipo);
    if (selectedTipo === 'pharmacy') {
      setPrecio(7000);  // Precio como int
    } else if (selectedTipo === 'aesthetic') {
      setPrecio(12000);  // Precio como int
    } else if (selectedTipo === 'veterinary') {
      setPrecio(15000);  // Precio como int
    } else {
      setPrecio('');
    }
  };
  

  // Enviar los datos del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos
    if (!tipo || !fecha || !precio || !mascotaId) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoadingForm(true);
    setError('');
    setSuccessMessage('');

    try {
      // Enviar los datos a la API, ahora pasamos el petId
      const result = await createAttention(tipo, fecha, precio, mascotaId);
      setSuccessMessage('Consulta creada exitosamente');
      
      // Opcionalmente, redirigir después de la creación
      setTimeout(() => navigate(`/pet/${mascotaId}`), 2000); // Redirige a la página de detalles de la mascota después de 2 segundos
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Agenda una consulta</h1>

      {loadingForm && <p className="text-gray-500">Agendando consulta...</p>}
      {errorState && <p className="text-red-500">{errorState}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Selección de la mascota */}
        <div>
          <label htmlFor="mascotaId" className="block text-sm font-medium text-gray-700">Selecciona tu mascota</label>
          <select
            id="mascotaId"
            name="mascotaId"
            value={mascotaId}
            onChange={(e) => setMascotaId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona tu mascota</option>
            {pets && pets.map((pet) => (
              <option key={pet.id} value={pet.id}>{pet.nombre}</option>
            ))}
          </select>
        </div>

        {/* Tipo de consulta */}
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de consulta</label>
          <select
            id="tipo"
            name="tipo"
            value={tipo}
            onChange={handleTipoChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona el tipo de consulta</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="aesthetic">Aesthetic</option>
            <option value="veterinary">Veterinary</option>
          </select>
        </div>

        {/* Fecha de la consulta */}
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha de la consulta</label>
          <input
            type="datetime-local"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={precio}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loadingForm}
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none"
        >
          {loadingForm ? 'Creating...' : 'Create Consultation'}
        </button>
      </form>
    </div>
  );
};

export default CreateAttentionPage;

