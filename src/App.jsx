import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Alerts from "./pages/Alerts";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
