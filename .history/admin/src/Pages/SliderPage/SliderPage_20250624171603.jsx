import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import './Slider.scss';

const Slider = () => {
  const [category, setCategory] = useState('temizlik');
  const [sliders, setSliders] = useState({
    temizlik: Array(10).fill(null).map((_, index) => ({ id: index + 1, image: `temizlik-${index + 1}.jpg` })),
    paketleme: Array(10).fill(null).map((_, index) => ({ id: index + 1, image: `paketleme-${index + 1}.jpg` })),
  });
  const [editId, setEditId] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAdd = () => {
    if (newImage) {
      setSliders({
        ...sliders,
        [category]: sliders[category].map(item => 
          item === null ? { id: Date.now(), image: URL.createObjectURL(newImage) } : item
        ).filter(item => item !== null).slice(0, 10)
      });
      setNewImage(null);
      setModalOpen(false);
    }
  };

  const handleEdit = (id) => {
    if (newImage) {
      setSliders({
        ...sliders,
        [category]: sliders[category].map(item => 
          item.id === id ? { ...item, image: URL.createObjectURL(newImage) } : item
        )
      });
      setEditId(null);
      setNewImage(null);
      setModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    setSliders({
      ...sliders,
      [category]: sliders[category].map(item => 
        item.id === id ? null : item
      )
    });
  };

  const openImageModal = (image) => {
    setModalContent(
      <div className="modalImageContainer">
        <img src={image} alt="Large view" />
      </div>
    );
    setModalOpen(true);
  };

  const openAddModal = () => {
    setModalContent(
      <div className="modalAddContainer">
        <h3>Resim Ekle</h3>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        <div className="modalActions">
          <button onClick={handleAdd} disabled={!newImage}>Ekle</button>
          <button onClick={() => setModalOpen(false)}>İptal</button>
        </div>
      </div>
    );
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditId(id);
    setModalContent(
      <div className="modalAddContainer">
        <h3>Resim Düzenle</h3>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        <div className="modalActions">
          <button onClick={() => handleEdit(id)} disabled={!newImage}>Kaydet</button>
          <button onClick={() => { setEditId(null); setModalOpen(false); }}>İptal</button>
        </div>
      </div>
    );
    setModalOpen(true);
  };

  return (
    <div className="sliderContainer">
      <div className="categorySelector">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="temizlik">Temizlik</option>
          <option value="paketleme">Paketleme</option>
        </select>
      </div>
      <div className="sliderGrid">
        {sliders[category].map((item, index) => (
          <div key={index} className="sliderCard">
            {item ? (
              <>
                <img 
                  src={item.image} 
                  alt={`Slider ${index + 1}`} 
                  onClick={() => openImageModal(item.image)}
                />
                <div className="cardActions">
                  <button onClick={() => openEditModal(item.id)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </>
            ) : (
              <div className="emptyCard">
                <button onClick={openAddModal}>
                  <FaPlus /> Ekle
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalClose" onClick={() => setModalOpen(false)}>
              <FaTimes />
            </button>
            {modalContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;