import React from "react";
import "./DeleteModal.scss";
import { useLocation } from "react-router-dom";

function DeleteModal({ isOpen, onClose, onDelete }) {
  if (!isOpen) return null;
  const loc = useLocation();
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {loc.pathname === "/erzaq" ? (
          <h3>Yeməyi silmək istədiyinizə əminsiniz?</h3>
        ) : loc.pathname === "/kateqoriya" ? (
          <h3>Kateqoriyanı silmək istədiyinizə əminsiniz?</h3>
        ) : (
          <h3>Bu əməliyyatı həyata keçirmək üçün icazəniz yoxdur.</h3>
        )}
        <div className="modal-buttons">
          <button className="delete-btn" onClick={onDelete}>
            Sil
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Ləğv et
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
