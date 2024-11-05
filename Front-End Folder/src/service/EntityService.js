import axios from 'axios';

// Definimos la URL base de la API para entidades
const BASE_URL = 'https://ifx-networks-1.onrender.com/api/entities';

const EntityService = {
  // Obtener todas las entidades (accesible para usuarios con y sin token)
  getAllEntities: async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.get(`${BASE_URL}/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener las entidades", error);
      throw error;
    }
  },

  // Obtener una entidad por ID (accesible para usuarios con y sin token)
  getEntityById: async (entityId) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.get(`${BASE_URL}/${entityId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la entidad", error);
      throw error;
    }
  },

  // Crear una nueva entidad (solo accesible para usuarios con token)
  createEntity: async (entityData) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.post(`${BASE_URL}/`, entityData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear la entidad", error);
      throw error;
    }
  },

  // Actualizar una entidad existente (solo accesible para usuarios con token)
  updateEntity: async (entityId, updatedData) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.put(`${BASE_URL}/${entityId}`, updatedData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la entidad", error);
      throw error;
    }
  },

  // Eliminar una entidad (solo accesible para usuarios con token)
  deleteEntity: async (entityId) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.delete(`${BASE_URL}/${entityId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar la entidad", error);
      throw error;
    }
  }
};

export default EntityService;
