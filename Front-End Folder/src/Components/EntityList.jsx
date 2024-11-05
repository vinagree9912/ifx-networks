import React, { useEffect, useState } from 'react';
import EntityService from '../service/EntityService.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entitiesPerPage = 5; // Número de entidades por página
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar todas las entidades al montar el componente
    const fetchEntities = async () => {
      try {
        const response = await EntityService.getAllEntities();
        const data = response?.data || [];
        setEntities(data);
      } catch (error) {
        console.error("Error al cargar las entidades", error);
        setEntities([]);
      }
    };

    fetchEntities();
  }, []);

  const handleDelete = async (entityId) => {
    try {
      await EntityService.deleteEntity(entityId);
      setEntities(entities.filter(entity => entity.id !== entityId));
      alert("Entidad eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la entidad", error);
      alert("No se pudo eliminar la entidad");
    }
  };

  // Calcular el índice de las entidades a mostrar según la página actual
  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
  const currentEntities = entities.slice(indexOfFirstEntity, indexOfLastEntity);

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(entities.length / entitiesPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Entidades</h2>

      {token && (
        <button className="btn btn-primary mb-4" onClick={() => navigate('/dashboard/entity/create')}>
          Crear Entidad
        </button>
      )}

      <div className="row">
        {currentEntities.length > 0 ? (
          currentEntities.map(entity => (
            <div className="col-md-4 mb-4" key={entity.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{entity.name}</h5>
                  <p className="card-text"><strong>Descripción:</strong> {entity.description}</p>
                  <p className="card-text"><small className="text-muted">Creado el: {new Date(entity.created_at).toLocaleDateString()}</small></p>
                  <p className="card-text"><small className="text-muted">Actualizado el: {new Date(entity.updated_at).toLocaleDateString()}</small></p>

                  {token && (
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-outline-primary" onClick={() => navigate(`/dashboard/entity/edit/${entity.id}`)}>
                        Editar
                      </button>
                      <button className="btn btn-outline-danger" onClick={() => handleDelete(entity.id)}>
                        Borrar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron entidades</p>
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

export default EntityList;
