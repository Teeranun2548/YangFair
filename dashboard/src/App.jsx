import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>📊 People Counter Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h2>People In</h2>
          <p className="number green">25</p>
        </div>

        <div className="card">
          <h2>People Out</h2>
          <p className="number red">10</p>
        </div>

        <div className="card">
          <h2>Current Inside</h2>
          <p className="number blue">15</p>
        </div>
      </div>
    </div>
  );
}

export default App;
