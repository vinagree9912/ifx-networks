import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService.js';

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    entity_id: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { employeeId } = useParams();

  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const response = await EmployeeService.getEmployeeById(employeeId);
          const data = response.data;
          setEmployeeData({
            name: data.name,
            email: data.email,
            position: data.position,
            entity_id: data.entity_id,
          });
        } catch (err) {
          console.error("Error al cargar el empleado", err);
          setError("No se pudo cargar la información del empleado");
        }
      };
      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      let response;
      if (employeeId) {
        response = await EmployeeService.updateEmployee(employeeId, {
          ...employeeData,
          updated_at: new Date().toISOString(),
        });
        setSuccessMessage('Empleado actualizado exitosamente');
      } else {
        const currentDateTime = new Date().toISOString();
        response = await EmployeeService.createEmployee({
          ...employeeData,
          created_at: currentDateTime,
          updated_at: currentDateTime,
        });
        setSuccessMessage('Empleado creado exitosamente');
      }

      setTimeout(() => {
        navigate('/dashboard/employee');
      }, 1500);

    } catch (err) {
      setError('Error al guardar el empleado. Verifica los datos e intenta nuevamente.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>{employeeId ? 'Editar Empleado' : 'Crear Nuevo Empleado'}</h2>

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
            value={employeeData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="position" className="form-label">Posición</label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="position"
            value={employeeData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="entity_id" className="form-label">ID de Entidad</label>
          <input
            type="text"
            className="form-control"
            id="entity_id"
            name="entity_id"
            value={employeeData.entity_id}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {employeeId ? 'Actualizar Empleado' : 'Crear Empleado'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
