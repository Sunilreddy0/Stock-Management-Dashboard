import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import Header from './Header';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Fetch stock data from the API
    const fetchStockData = async () => {
      const API_KEY = 'sk_df5701fa307146a998ef29bfc11cea75'; 
      const apiUrl = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${API_KEY}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setStocks(data); 
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const displayGraph = async (symbol) => {
    setSelectedStock(symbol);

    // Fetch historical data for the selected stock using 'symbol'
    try {
      const historicalUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=sk_df5701fa307146a998ef29bfc11cea75`;
      const response = await fetch(historicalUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();

      // Destroy the existing chart instance if it exists
      if (chartInstanceRef.current !== null) {
        chartInstanceRef.current.destroy();
      }

      const chartLabels = data.map((item) => item.date);
      const chartData = data.map((item) => item.close);

      // Create the chart
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: `${symbol}`,
              data: chartData,
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Price',
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className="stock-list-container">
      <h1>Live Stock List</h1>
      <div className="stock-list-wrapper">
        <ul className="stock-list">
          {stocks.map((stock) => (
            <li key={stock.symbol} className="stock-item" onClick={() => displayGraph(stock.symbol)}>
              <strong>{stock.symbol}</strong>: {stock.companyName} - ${stock.latestPrice}
            </li>
          ))}
        </ul>
        {selectedStock && (
          <div className="chart-container">
            <canvas ref={chartRef} width={400} height={300}></canvas>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default StockList;