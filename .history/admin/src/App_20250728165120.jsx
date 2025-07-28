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
  return localStorage.getItem("access_token") ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  return localStorage.getItem("access_token") ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <NotMean />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/erzaq" element={<FoodPage />} />
          <Route path="/erzaq/edit/:id" element={<UpdatePage />} />
          <Route path="/erzaq/add" element={<AddPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;