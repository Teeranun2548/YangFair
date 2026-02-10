import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://backend:5000");

function App() {
  const [count, setCount] = useState(0);
  const [milestone, setMilestone] = useState(false);

  useEffect(() => {
    socket.on("count_update", (data) => {
      setCount(data.count);
      setMilestone(data.milestone);
    });

    return () => socket.off("count_update");
  }, []);

  return (
    <div className="app">
      <h1>🚶‍♂️ People Counter Dashboard</h1>

      <div className="card">
        <p className="label">จำนวนผู้เข้าชมทั้งหมด</p>
        <p className="count">{count}</p>
      </div>

      {milestone && (
        <div className="milestone">
          🎉 ยินดีด้วย! ครบ {count} คนแล้ว!
        </div>
      )}

      <footer>Realtime IoT • ESP32 • MQTT • Docker</footer>
    </div>
  );
}

export default App;
