import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/endpoint';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [grado, setGrado] = useState('TSU');
  const [grupo, setGrupo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [qrCode, setQrCode] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.SERVER1}/register`, { email, username, password, grado, grupo });
      setSuccess('Registration successful! Scan the QR code with Google Authenticator.');
      setQrCode(response.data.qrCode);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during registration');
      setSuccess('');
      setQrCode(null);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      {qrCode && (
        <div className="text-center mb-4">
          <p>Scan this QR code with Google Authenticator:</p>
          <img src={qrCode} alt="QR Code for Google Authenticator" className="mx-auto mt-2" />
        </div>
      )}
      <form onSubmit={handleRegister} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Grado</label>
            <select
              value={grado}
              onChange={(e) => setGrado(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="TSU">TSU</option>
              <option value="Ingeniería">Ingeniería</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Grupo</label>
            <input
              type="text"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Regitrar
        </button>
      </form>
      <p className="text-center mt-4">
        Ya tienes una cuenta?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;