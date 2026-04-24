import { Routes, Route } from "react-router-dom";
import Login from "./features/login/pages/Login";
import Dashboard from "./features/dashboard/pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;