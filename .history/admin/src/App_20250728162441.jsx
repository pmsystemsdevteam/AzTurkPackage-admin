import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import NotMean from "./Components/NotMean/NotMean";
import Footer from "./Layout/Footer/Footer";
import Navbar from "./Layout/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import AddPage from "./Pages/SameScssOne/AddPage";
import UpdatePage from "./Pages/SameScssOne/UpdatePage";
import FoodPage from "./Pages/SameScssTwo/FoodPage";
import axios from "axios";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://172.20.10.175:8000/api/auth/user/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setIsAdmin(response.data.is_admin || false);
      } catch {
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<><NotMean /><HomePage /></>} />
            <Route path="/erzaq" element={<><NotMean /><FoodPage /></>} />
            <Route path="/erzaq/edit/:id" element={<><NotMean /><UpdatePage /></>} />
            <Route path="/erzaq/add" element={<><NotMean /><AddPage /></>} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;