import React from "react";
import "./Main.scss";
import { AiOutlineClear } from "react-icons/ai";
function HomePage() {
  const foodCount = 25; // bu dinamik ola bilər
  const categoryCount = 7;

  return (
    <div className="home-container">
      <div className="face">
        <div className="icon-wrapper">
          <AiOutlineClear className="animated-icon" />
        </div>
        <h1 className="count-text">Təmizlik məhsulu sayı: {foodCount}</h1>
        <h2 className="count-text">Paketləmə məhsulu sayı: {categoryCount}</h2>
      </div>
    </div>
  );
}

export default HomePage;
