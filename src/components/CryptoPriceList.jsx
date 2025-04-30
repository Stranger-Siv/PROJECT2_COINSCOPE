// src/components/CryptoPriceList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoCard from './CryptoCard';

const CryptoPriceList = ({ searchTerm }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 200,
            page: 1,
            sparkline: false,
          },
        });
        setCryptos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  const toggleCoinDetails = (id) => {
    setSelectedCoinId((prev) => (prev === id ? null : id));
  };

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4">
      {filteredCryptos.length > 0 ? (
        filteredCryptos.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            expanded={selectedCoinId === crypto.id}
            onToggle={() => toggleCoinDetails(crypto.id)}
          />
        ))
      ) : (
        <div className="text-center py-10">No cryptocurrencies found</div>
      )}
    </div>
  );
};

export default CryptoPriceList;
