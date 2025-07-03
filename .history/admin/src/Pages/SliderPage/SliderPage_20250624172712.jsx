import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import './SliderPage.scss';

const Slider = () => {
  const [category, setCategory] = useState('temizlik');
  const [sliders, setSliders] = useState({
    temizlik: Array(10).fill(null).map((_, index) => ({ id: index + 1, image: `temizlik-${index + 1}.jpg` })),
    paketleme: Array(10).fill(null).map((_, index) => ({ id: index + 1, image: `paketleme-${index + 1}.jpg` })),
  });
  const [newImages, setNewImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleAdd = () => {
    if (newImages.length > 0) {
      const newSlider = { id: Date.now(), image: URL.createObjectURL(newImages[0]) };
      setSliders({
        ...sliders,
        [category]: [
          ...sliders[category].filter(item => item !== null),
          newSlider,
        ].slice(0, 10).map((item, index) => ({ ...item, id: index + 1 })),
      });
      setNewImages([]);
      setModalOpen(false);
    }
  };

  const handleEdit = (id) => {
    if (newImages.length > 0) {
      setSliders({
        ...sliders,
        [category]: sliders[category].map(item =>
          item && item.id === id ? { ...item, image: URL.createObjectURL(newImages[0]) } : item
        ),
      });
      setNewImages([]);
      setModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    setSliders({
      ...sliders,
      [category]: sliders[category].map(item => (item && item.id === id ? null : item)),
    });
  };

  const handleDeleteAll = () => {
    setSliders({
      ...sliders,
      [category]: Array(10).fill(null),
    });
  };

  // const handleEditAll = () => {
  //   if (newImages.length > 0) {
  //     setSliders({
  //       ...sliders,
  //       [category]: sliders[category].map(item =>
  //         item ? { ...item, image: URL.createObjectURL(newImages[0]) } : item
  //       ),
  //     });
  //     setNewImages([]);
  //     setModalOpen(false);
  //   }
  // };

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
          onChange={(e) => setNewImages([e.target.files[0]])}
        />
        <div className="modalActions">
          <button onClick={handleAdd} disabled={newImages.length === 0}>Ekle</button>
          <button onClick={() => setModalOpen(false)}>İptal</button>
        </div>
      </div>
    );
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    setModalContent(
      <div className="modalAddContainer">
        <h3>Resim Düzenle</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImages([e.target.files[0]])}
        />
        <div className="modalActions">
          <button onClick={() => handleEdit(id)} disabled={newImages.length === 0}>Kaydet</button>
          <button onClick={() => setModalOpen(false)}>İptal</button>
        </div>
      </div>
    );
    setModalOpen(true);
  };

  const openEditAllModal = () => {
    setModalContent(
      <div className="modalAddContainer">
        <h3>Tüm Resimleri Düzenle</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImages([e.target.files[0]])}
        />
        <div className="modalActions">
          <button onClick={handleEditAll} disabled={newImages.length === 0}>Tümünü Kaydet</button>
          <button onClick={() => setModalOpen(false)}>İptal</button>
        </div>
      </div>
    );
    setModalOpen(true);
  };

  return (
    <div className="sliderContainer">
      <div className="categorySelector">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="temizlik">Temizlik</option>
          <option value="paketleme">Paketleme</option>
        </select>
        <div className="bulkActions">
          <button onClick={openAddModal}>
            <FaPlus /> Ekle
          </button>
          <button onClick={openEditAllModal}>
            <FaEdit /> Hepsini Düzenle
          </button>
          <button onClick={handleDeleteAll}>
            <FaTrash /> Hepsini Sil
          </button>
        </div>
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
                <span>Boş</span>
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