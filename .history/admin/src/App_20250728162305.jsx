import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./Layout/Footer/Footer";
import Navbar from "./Layout/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import AddPage from "./Pages/SameScssOne/AddPage";
import UpdatePage from "./Pages/SameScssOne/UpdatePage";
import FoodPage from "./Pages/SameScssTwo/FoodPage";
import axios from "axios";
import { useEffect, useState } from "react";

// Hata sayfası bileşeni
const NotFound = () => {
  return <div>404 - Sayfa Bulunamadı</div>;
};

// PrivateRoute: Kullanıcı giriş yapmış mı kontrol eder
const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// AdminRoute: Kullanıcı admin mi kontrol eder
const AdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://172.20.10.175:8000/api/auth/user/", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setIsAdmin(response.data.is_admin || false);
      } catch (error) {
        console.error("Admin kontrolü hatası:", error);
        setIsAdmin(false);
      }
    };
    if (localStorage.getItem("access_token")) {
      checkAdmin();
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) {
    return <div>Yükleniyor...</div>; // Yükleme durumu için görsel geri bildirim
  }
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/erzaq" element={<FoodPage />} />
              <Route path="/erzaq/edit/:id" element={<UpdatePage />} />
              <Route path="/erzaq/add" element={<AddPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;