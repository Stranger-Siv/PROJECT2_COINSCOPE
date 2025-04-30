// src/components/CryptoDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const CryptoDetails = () => {
  const { id } = useParams(); // Get the crypto id from the URL
  const navigate = useNavigate(); // hook to navigate back
  const [crypto, setCrypto] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the details of the cryptocurrency
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCrypto(response.data);

        // Fetching historical price data (last 7 days)
        const historicalResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: '7', // Get the last 7 days of data
          },
        });
        setHistoricalData(historicalResponse.data.prices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Prepare data for the chart
  const chartData = {
    labels: historicalData.map((data) => new Date(data[0]).toLocaleDateString()), // Convert timestamps to date strings
    datasets: [
      {
        label: `${crypto?.name} Price (USD)`,
        data: historicalData.map((data) => data[1]), // Price data
        fill: false,
        borderColor: '#4e73df',
        tension: 0.1,
      },
    ],
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)} // Navigate to the previous page
        className="mb-4 bg-gray-800 text-white px-4 py-2 rounded-md"
      >
        Back
      </button>
      
      <h2 className="text-2xl font-semibold mb-4">{crypto?.name} ({crypto?.symbol.toUpperCase()})</h2>
      
      {/* Display the chart */}
      <div className="mb-6">
        <Line data={chartData} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold">Current Price:</p>
          <p>${crypto?.market_data.current_price.usd}</p>
        </div>
        <div>
          <p className="font-semibold">24h High:</p>
          <p>${crypto?.market_data.high_24h.usd}</p>
        </div>
        <div>
          <p className="font-semibold">24h Low:</p>
          <p>${crypto?.market_data.low_24h.usd}</p>
        </div>
        <div>
          <p className="font-semibold">Market Cap:</p>
          <p>${crypto?.market_data.market_cap.usd}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
