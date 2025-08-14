import React, { useEffect, useState } from "react";
import "./Main.scss";
import { AiOutlineClear } from "react-icons/ai";
import axios from "axios";

function HomePage() {
  const [product, setProduct] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/packages/`);
        setProduct(res.data);
      } catch (error) {
   
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const cleaningCount = product.filter(
    (item) => item?.MainCategory === "cleaning"
  ).length;

  const packagingCount = product.filter(
    (item) => item?.MainCategory === "packaging"
  ).length;

  return (
    <div className="home-container">
      <div className="face">
        <div className="icon-wrapper">
          <AiOutlineClear className="animated-icon" />
        </div>
        <h1 className="count-text">Təmizlik məhsulu sayı: {cleaningCount}</h1>
        <h2 className="count-text">Paketləmə məhsulu sayı: {packagingCount}</h2>
      </div>
    </div>
  );
}

export default HomePage;
