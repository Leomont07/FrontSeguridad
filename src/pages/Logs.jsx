import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import config from '../config/endpoint';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Logs = () => {
  const [server1Logs, setServer1Logs] = useState([]);
  const [server2Logs, setServer2Logs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const [server1Response, server2Response] = await Promise.all([
          axios.get(`${config.SERVER1}/logs`),
          axios.get(`${config.SERVER2}/logs`),
        ]);
        setServer1Logs(server1Response.data);
        setServer2Logs(server2Response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Process logs for charts
  const processLogLevels = (logs) => {
    const levels = { info: 0, error: 0 };
    logs.forEach(log => {
      levels[log.level] = (levels[log.level] || 0) + 1;
    });
    return levels;
  };

  const processResponseTimes = (logs) => {
    const buckets = { '0-50ms': 0, '51-100ms': 0, '101-200ms': 0, '201+ms': 0 };
    logs.forEach(log => {
      const time = log.responseTime;
      if (time <= 50) buckets['0-50ms']++;
      else if (time <= 100) buckets['51-100ms']++;
      else if (time <= 200) buckets['101-200ms']++;
      else buckets['201+ms']++;
    });
    return buckets;
  };

  const server1Levels = processLogLevels(server1Logs);
  const server2Levels = processLogLevels(server2Logs);
  const server1ResponseTimes = processResponseTimes(server1Logs);
  const server2ResponseTimes = processResponseTimes(server2Logs);

  // Chart data for log levels
  const logLevelChartData = {
    labels: ['Info', 'Error'],
    datasets: [
      {
        label: 'Server 1 (With Rate Limit)',
        data: [server1Levels.info, server1Levels.error],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Server 2 (Without Rate Limit)',
        data: [server2Levels.info, server2Levels.error],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Chart data for response times
  const responseTimeChartData = {
    labels: ['0-50ms', '51-100ms', '101-200ms', '201+ms'],
    datasets: [
      {
        label: 'Server 1 (With Rate Limit)',
        data: [
          server1ResponseTimes['0-50ms'],
          server1ResponseTimes['51-100ms'],
          server1ResponseTimes['101-200ms'],
          server1ResponseTimes['201+ms'],
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Server 2 (Without Rate Limit)',
        data: [
          server2ResponseTimes['0-50ms'],
          server2ResponseTimes['51-100ms'],
          server2ResponseTimes['101-200ms'],
          server2ResponseTimes['201+ms'],
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Logs</h1>
      {loading ? (
        <p className="text-center">Cargando los logs...</p>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Log Levels Distribution</h2>
            <Bar
              data={logLevelChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Log Levels' } } }}
            />
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Response Time Distribution</h2>
            <Bar
              data={responseTimeChartData}
              options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Response Times' } } }}
            />
          </div>
        </div>
      )}
      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Logs;