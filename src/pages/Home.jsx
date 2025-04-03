import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'N/A';
  const grado = localStorage.getItem('grado') || 'N/A';
  const grupo = localStorage.getItem('grupo') || 'N/A';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('grado'); 
    localStorage.removeItem('grupo'); 
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Home</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Acerca de la App</h2>
        <p className="mb-4">
          Esta aplicación es un sistema basado en API REST con dos servidores: uno con limitación (Servidor 1) y otro sin él (Servidor 2). Permite a los usuarios registrarse, iniciar sesión con MFA y ver los registros de las solicitudes de API. Los registros se visualizan en la vista Logs con gráficos de barras que muestran diferentes niveles de registro y otros parámetros.
        </p>
        <h3 className="text-xl font-semibold mb-2">Información Usuario</h3>
        <p>
          <strong>Nombre:</strong> {username} <br />
          <strong>Grado:</strong> {grado} <br />
          <strong>Grupo:</strong> {grupo}
        </p>
        <h3 className="text-xl font-semibold mb-2">Información Alumno</h3>
        <p>
          <strong>Nombre:</strong> José Leonardo Montero Núñez <br />
          <strong>Grado:</strong> TSU <br />
          <strong>Grupo:</strong> IDGS11
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Información maestro</h3>
        <p>
          <strong>Nombre:</strong> Emmanuel Martínez Hernández <br />
        </p>
        <button
          onClick={() => navigate('/logs')}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Logs
        </button>
      </div>
    </div>
  );
};

export default Home;