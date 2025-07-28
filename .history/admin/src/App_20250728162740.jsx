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

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const isAdmin = localStorage.getItem("is_admin") === "true";
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <NotMean />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/erzaq" element={<FoodPage />} />
            <Route path="/erzaq/add" element={<AddPage />} />
            <Route path="/erzaq/edit/:id" element={<UpdatePage />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
