import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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

function App() {
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
    if (localStorage.getItem("access_token")) {
      checkAdmin();
    } else {
      setIsAdmin(false);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("access_token") && isAdmin ? (
              <>
                <NotMean />
                <HomePage />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/erzaq"
          element={
            localStorage.getItem("access_token") && isAdmin ? (
              <>
                <NotMean />
                <FoodPage />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/erzaq/edit/:id"
          element={
            localStorage.getItem("access_token") && isAdmin ? (
              <>
                <NotMean />
                <UpdatePage />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/erzaq/add"
          element={
            localStorage.getItem("access_token") && isAdmin ? (
              <>
                <NotMean />
                <AddPage />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;