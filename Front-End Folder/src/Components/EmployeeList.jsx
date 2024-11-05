import React, { useEffect, useState } from 'react';
import EmployeeService from '../service/EmployeeService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // Número de empleados por página
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar todos los empleados al montar el componente
    const fetchEmployees = async () => {
      try {
        const response = await EmployeeService.getAllEmployees();
        const data = response?.data || [];
        setEmployees(data);
      } catch (error) {
        console.error("Error al cargar los empleados", error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      await EmployeeService.deleteEmployee(employeeId);
      setEmployees(employees.filter(employee => employee.id !== employeeId));
      alert("Empleado eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el empleado", error);
      alert("No se pudo eliminar el empleado");
    }
  };

  // Calcular el índice de los empleados a mostrar según la página actual
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Empleados</h2>

      {token && (
        <button className="btn btn-primary mb-4" onClick={() => navigate('/dashboard/employee/create')}>
          Crear Empleado
        </button>
      )}

      <div className="row">
        {currentEmployees.length > 0 ? (
          currentEmployees.map(employee => (
            <div className="col-md-4 mb-4" key={employee.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{employee.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {employee.email}</p>
                  <p className="card-text"><strong>Position:</strong> {employee.position}</p>
                  <p className="card-text"><strong>Entity ID:</strong> {employee.entity_id}</p>
                  <p className="card-text"><small className="text-muted">Created at: {new Date(employee.created_at).toLocaleDateString()}</small></p>
                  <p className="card-text"><small className="text-muted">Updated at: {new Date(employee.updated_at).toLocaleDateString()}</small></p>

                  {token && (
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-primary" onClick={() => navigate(`/dashboard/employee/edit/${employee.id}`)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(employee.id)}>
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron empleados</p>
        )}
      </div>

      {/* Paginador */}
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Anterior
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EmployeeList;
