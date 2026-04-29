import { Routes, Route } from "react-router-dom";

import Dashboard from "./features/Dashboard/Dashboard";
import Login from "./features/login-new/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;