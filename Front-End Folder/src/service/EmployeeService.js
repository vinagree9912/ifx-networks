import axios from 'axios';

// Definimos la URL base de la API
const BASE_URL = 'https://ifx-networks.onrender.com/api/employees';

const EmployeeService = {
  // Obtener todos los empleados (accesible para usuarios con y sin token)
  getAllEmployees: async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.get(`${BASE_URL}/`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener los empleados", error);
      throw error;
    }
  },

  // Obtener un empleado por ID (accesible para usuarios con y sin token)
  getEmployeeById: async (employeeId) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.get(`${BASE_URL}/${employeeId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener el empleado", error);
      throw error;
    }
  },

  // Crear un nuevo empleado (solo accesible para usuarios con token)
  createEmployee: async (employeeData) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.post(`${BASE_URL}/`, employeeData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear el empleado", error);
      throw error;
    }
  },

  // Actualizar un empleado existente (solo accesible para usuarios con token)
  updateEmployee: async (employeeId, updatedData) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.put(`${BASE_URL}/${employeeId}`, updatedData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el empleado", error);
      throw error;
    }
  },

  // Eliminar un empleado (solo accesible para usuarios con token)
  deleteEmployee: async (employeeId) => {
    try {
      const token = localStorage.getItem("accessToken"); // Obtener token dinámicamente
      const response = await axios.delete(`${BASE_URL}/${employeeId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : null
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el empleado", error);
      throw error;
    }
  }
};

export default EmployeeService;
