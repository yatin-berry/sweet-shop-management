import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="container">
        <h1>Sweet Shop Management System</h1>

        <Routes>
          {/* Always start with Register */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Register */}
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/dashboard" />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/dashboard" />}
          />

          {/* Dashboard (Protected) */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/register" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
