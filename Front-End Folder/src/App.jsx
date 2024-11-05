import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './Components/Start';
import Register from "./Components/Register";
import Logout from "./Components/Logout";
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import EmployeeList from "./Components/EmployeeList";
import EmployeeForm from "./Components/EmployeeForm";
import EntityList from './Components/EntityList';
import EntityForm from './Components/EntityForm';
import NewDashboard from "./Components/NewDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<Start />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/adminlogin" element={<Login />} />

        {/* Dashboard como ruta contenedora */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="features" element={<NewDashboard />} /> {/* Nueva ruta para el componente NewDashboard */}
          {/* Rutas para empleados */}
          <Route path="employee" element={<EmployeeList />} />
          <Route path="employee/create" element={<EmployeeForm />} /> {/* Ruta para crear un empleado */}
          <Route path="employee/edit/:employeeId" element={<EmployeeForm />} /> {/* Ruta para editar un empleado */}

          {/* Rutas para entidades */}
          <Route path="entity" element={<EntityList />} /> {/* Ruta para listar entidades */}
          <Route path="entity/create" element={<EntityForm />} /> {/* Ruta para crear una entidad */}
          <Route path="entity/edit/:entityId" element={<EntityForm />} /> {/* Ruta para editar una entidad */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
