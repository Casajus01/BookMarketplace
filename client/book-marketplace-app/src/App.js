// 📁 src/App.js
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage"; 

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<LandingPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
