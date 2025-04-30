import React from 'react';

const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

const CryptoCard = ({ crypto, expanded, onToggle }) => {
  const isNegative = crypto.price_change_percentage_24h < 0;

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer bg-gray-800 text-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src={crypto.image} alt={crypto.name} className="h-12 w-12 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">
              {crypto.name} <span className="text-gray-400">({crypto.symbol.toUpperCase()})</span>
            </h2>
            <p className={`text-sm ${isNegative ? 'text-red-400' : 'text-green-400'}`}>
              24h: {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-1">
            MCap: ${formatNumber(crypto.market_cap)}
          </p>
        </div>
      </div>

      {expanded && (
  <div className="mt-6 p-6 bg-gray-900 rounded-lg shadow-inner transition-all duration-300">
    <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Detailed Info</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      <p>
        <span className="text-gray-400">24h High:</span> ${crypto.high_24h.toLocaleString()} 
      </p>
      <p>
        <span className="text-gray-400">24h Low:</span> ${crypto.low_24h.toLocaleString()}
      </p>
      <p>
        <span className="text-gray-400">All-Time High:</span> ${crypto.ath.toLocaleString()}
      </p>
      <p>
        <span className="text-gray-400">Circulating Supply:</span> {formatNumber(crypto.circulating_supply)}
      </p>
      <p>
        <span className="text-gray-400">Market Cap Rank:</span> #{crypto.market_cap_rank}
      </p>
      <p>
        <span className="text-gray-400">Total Volume:</span> ${formatNumber(crypto.total_volume)}
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default CryptoCard;
