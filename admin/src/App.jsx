import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotMean from "./Components/NotMean/NotMean";
import Footer from "./Layout/Footer/Footer";
import Navbar from "./Layout/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import AddPage from "./Pages/SameScssOne/AddPage";
import UpdatePage from "./Pages/SameScssOne/UpdatePage";
import FoodPage from "./Pages/SameScssTwo/FoodPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <NotMean />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/erzaq" element={<FoodPage />} />
        <Route path="/erzaq/edit/:id" element={<UpdatePage />} />
        <Route path="/erzaq/add" element={<AddPage />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
