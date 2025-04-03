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
        <h2 className="text-2xl font-semibold mb-4">About the Application</h2>
        <p className="mb-4">
          This application is a REST API-based system with two servers: one with rate limiting (Server 1) and one without (Server 2). It allows users to register, log in with MFA (multi-factor authentication), and view logs of API requests. The logs are visualized in the Logs view with bar charts showing different log levels and other parameters.
        </p>
        <h3 className="text-xl font-semibold mb-2">Student Information</h3>
        <p>
          <strong>Name:</strong> {username} <br />
          <strong>Degree:</strong> {grado} <br />
          <strong>Group:</strong> {grupo}
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Teacher Information</h3>
        <p>
          <strong>Name:</strong> [Teacher's Full Name] <br />
          <strong>Degree:</strong> [Teacher's Degree, e.g., PhD in Computer Science] <br />
          <strong>Group:</strong> [Teacher's Group, if applicable]
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