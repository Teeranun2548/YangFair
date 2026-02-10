import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const socket = io("http://localhost:5000");

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("people_update", (data) => {
      setCount(data.current);
      setHistory((prev) => [...prev.slice(-9), data.current]);
    });

    return () => socket.off("people_update");
  }, []);

  const chartData = {
    labels: history.map((_, i) => i + 1),
    datasets: [
      {
        label: "People Inside",
        data: history,
        borderColor: "#60a5fa",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container">
      <h1>People Counter Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h2>Current Inside</h2>
          <p className="number blue">{count}</p>
        </div>
      </div>

      <div className="card chart">
        <h2>Realtime Chart</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default App;
