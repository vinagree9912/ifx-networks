import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EntityService from '../service/EntityService.js';

const EntityForm = () => {
  const [entityData, setEntityData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { entityId } = useParams();

  useEffect(() => {
    if (entityId) {
      const fetchEntity = async () => {
        try {
          const response = await EntityService.getEntityById(entityId);
          const data = response.data;
          setEntityData({
            name: data.name,
            description: data.description,
          });
        } catch (err) {
          console.error("Error al cargar la entidad", err);
          setError("No se pudo cargar la información de la entidad");
        }
      };
      fetchEntity();
    }
  }, [entityId]);

  const handleChange = (e) => {
    setEntityData({
      ...entityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      let response;
      if (entityId) {
        // Actualizar entidad existente
        response = await EntityService.updateEntity(entityId, {
          ...entityData,
          updated_at: new Date().toISOString(),
        });
        setSuccessMessage('Entidad actualizada exitosamente');
      } else {
        // Crear nueva entidad con created_at y updated_at
        const currentDateTime = new Date().toISOString();
        response = await EntityService.createEntity({
          ...entityData,
          created_at: currentDateTime,
          updated_at: currentDateTime,
        });
        setSuccessMessage('Entidad creada exitosamente');
      }

      setTimeout(() => {
        navigate('/dashboard/entity');
      }, 1500);

    } catch (err) {
      setError('Error al guardar la entidad. Verifica los datos e intenta nuevamente.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{entityId ? 'Editar Entidad' : 'Crear Nueva Entidad'}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={entityData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={entityData.description}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {entityId ? 'Actualizar Entidad' : 'Crear Entidad'}
        </button>
      </form>
    </div>
  );
};

export default EntityForm;
