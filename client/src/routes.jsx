import { Routes, Route } from "react-router-dom";
import User from "./pages/SignIn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Feedback from "./pages/Feedback";
import Admin from "./pages/Admin";
import AdminDetails from "./pages/AdminDetails";
import NotFound from "./pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<User />} />
      <Route path="/si" element={<SignIn />} />
      <Route path="/su" element={<SignUp />} />

      {/* Protected/Admin Routes */}
      <Route path="/fb" element={<Feedback />} />
      <Route path="/a" element={<Admin />} />
      <Route path="/ad" element={<AdminDetails />} />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
