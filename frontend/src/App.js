import React, { useEffect, useState } from 'react';

function App() {
  const [trafficData, setTrafficData] = useState(null);
  const [pollutionData, setPollutionData] = useState(null);
  const [violations, setViolations] = useState([]);

  useEffect(() => {
    // Fetch traffic data from backend
    fetch('http://localhost:5000/api/traffic')
      .then(res => res.json())
      .then(data => setTrafficData(data))
      .catch(err => console.error('Error fetching traffic data:', err));

    // Fetch pollution data from backend
    fetch('http://localhost:5000/api/pollution')
      .then(res => res.json())
      .then(data => setPollutionData(data))
      .catch(err => console.error('Error fetching pollution data:', err));

    // Fetch violations data (simulated)
    // In real app, this might be a websocket or polling
    fetch('http://localhost:5000/api/traffic')
      .then(res => res.json())
      .then(data => setViolations(data.violations || []))
      .catch(err => console.error('Error fetching violations:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-roboto">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Drone-Assisted Traffic Monitoring & Pollution Control</h1>
      </header>

      <main className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Live Drone Video Feed */}
        <section className="bg-white rounded shadow p-4 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Live Drone Video Feed (Simulated)</h2>
          <div className="bg-gray-300 h-64 flex items-center justify-center text-gray-700">
            Video feed placeholder
          </div>
          <div className="mt-4">
            <p>Vehicle Count: {trafficData ? trafficData.vehicle_count : 'Loading...'}</p>
            <p>Congestion Level: {trafficData ? trafficData.congestion_level : 'Loading...'}</p>
          </div>
        </section>

        {/* Pollution Map */}
        <section className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Pollution Levels</h2>
          <div className="bg-gray-300 h-64 flex items-center justify-center text-gray-700">
            Google Maps placeholder
          </div>
          <div className="mt-4">
            <p>PM2.5: {pollutionData ? pollutionData.pm25 : 'Loading...'}</p>
            <p>PM10: {pollutionData ? pollutionData.pm10 : 'Loading...'}</p>
            <p>NO2: {pollutionData ? pollutionData.no2 : 'Loading...'}</p>
            <p>CO: {pollutionData ? pollutionData.co : 'Loading...'}</p>
            <p>Ozone: {pollutionData ? pollutionData.ozone : 'Loading...'}</p>
            <p>Pollution Level: {pollutionData ? pollutionData.pollution_level : 'Loading...'}</p>
          </div>
        </section>

        {/* Traffic Violations */}
        <section className="bg-white rounded shadow p-4 col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-2">Traffic Violations</h2>
          {violations.length === 0 ? (
            <p>No violations reported.</p>
          ) : (
            <ul>
              {violations.map((v, index) => (
                <li key={index} className="border-b border-gray-200 py-2 flex items-center space-x-4">
                  <img src={v.photo_url} alt="Violation" className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p><strong>Vehicle Number:</strong> {v.vehicle_number}</p>
                    <p><strong>Helmet:</strong> {v.helmet ? 'Yes' : 'No'}</p>
                    <p><strong>Time:</strong> {v.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        &copy; 2024 Drone Traffic Monitoring System
      </footer>
    </div>
  );
}

export default App;
