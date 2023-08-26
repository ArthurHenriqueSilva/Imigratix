import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import "../styles/style.css"; // Importe o arquivo de estilos

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const ChartComponent = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: ["SP", "SE", "RJ", "BA", "MG"],
    datasets: [
      {
        label: "Exemplo de Dados",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const generateRandomData = () => {
    const randomData = chartData.datasets[0].data.map(() =>
      Math.floor(Math.random() * 10)
    );
    setChartData({
      ...chartData,
      datasets: [{ ...chartData.datasets[0], data: randomData }],
    });
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (window.myChart) {
      window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (window.myChart) {
        window.myChart.destroy();
      }
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <h2>Gráfico de uso por Estado</h2>
      <canvas className="canvas" ref={chartRef}></canvas>
      <button onClick={generateRandomData} className="gerarGrafico">
        Gerar gráfico
      </button>
    </div>
  );
};

export default ChartComponent;
