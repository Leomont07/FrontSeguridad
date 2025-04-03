import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config/endpoint';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState('login');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.SERVER1}/login`, { email, password });
      setUserId(response.data.userId);
      setStep('otp');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during login');
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando peticion OTP');
      const response = await axios.post(`${config.SERVER1}/verify-mfa`, { userId, otp });
      console.log('peticion OTP enviada');
      localStorage.setItem('token', response.data.token);
      const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
      localStorage.setItem('username', tokenPayload.username);
      console.log('usuario: ' + localStorage.getItem('username'))
      localStorage.setItem('grado', tokenPayload.grado);
      localStorage.setItem('grupo', tokenPayload.grupo);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {step === 'login' ? (
        <form onSubmit={handleLogin} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerify} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700">Ingrese el codigo OTP de Google Authenticator</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Verify OTP
          </button>
        </form>
      )}
      <p className="text-center mt-4">
        No tienes una cuenta?{' '}
        <a href="/register" className="text-blue-500 hover:underline">
          Registrate
        </a>
      </p>
    </div>
  );
};

export default Login;