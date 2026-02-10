import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./App.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const socket = io("http://backend:5000");

function App() {
  const [count, setCount] = useState(0);
  const [milestone, setMilestone] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    socket.on("count_update", (data) => {
      setCount(data.count);
      setMilestone(data.milestone);

      setHistory((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString(),
          value: data.count,
        },
      ]);

      if (data.milestone) {
        new Audio("/success.mp3").play();
      }
    });

    return () => socket.off("count_update");
  }, []);

  const resetCounter = () => {
    socket.emit("reset_counter");
    setHistory([]);
  };

  return (
    <div className="app">
      <h1>🚶‍♂️ People Counter Dashboard</h1>

      <div className="grid">
        <div className="card big">
          <p className="label">จำนวนผู้เข้าชม</p>
          <p className="count">{count}</p>
        </div>

        <div className="card">
          <p className="label">กราฟ Realtime</p>
          <Line
            data={{
              labels: history.map((h) => h.time),
              datasets: [
                {
                  data: history.map((h) => h.value),
                  borderWidth: 3,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>

      {milestone && (
        <div className="milestone">
          🎉 ครบ {count} คนแล้ว!
        </div>
      )}

      <button className="reset" onClick={resetCounter}>
        🔄 Reset Counter
      </button>

      <footer>ESP32 • Node-RED • MQTT • Docker • Realtime</footer>
    </div>
  );
}

export default App;
