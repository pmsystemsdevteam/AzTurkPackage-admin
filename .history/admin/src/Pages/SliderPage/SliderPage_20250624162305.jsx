import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import './SliderPage.scss';

const Slider = () => {
  const [category, setCategory] = useState('temizlik');
  const [sliders, setSliders] = useState({
    temizlik: Array(10).fill(null).map((_, index) => ({ id: index + 1, image: `temizlik-${index + 1}.jpg` })),
    paketleme: Array(10).fill(null).map((_, index) => ({ id: index + 1, image: `paketleme-${index + 1}.jpg` })),
  });
  const [editId, setEditId] = useState(null);
  const [newImage, setNewImage] = useState(null);

  const handleAdd = () => {
    if (newImage) {
      setSliders({
        ...sliders,
        [category]: sliders[category].map(item => 
          item === null ? { id: Date.now(), image: URL.createObjectURL(newImage) } : item
        ).filter(item => item !== null).slice(0, 10)
      });
      setNewImage(null);
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
                <img src={item.image} alt={`Slider ${index + 1}`} />
                <div className="cardActions">
                  <button onClick={() => setEditId(item.id)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <FaTrash />
                  </button>
                </div>
              </>
            ) : (
              <div className="emptyCard">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
                <button onClick={handleAdd}>
                  <FaPlus />
                </button>
              </div>
            )}
            {editId === item?.id && (
              <div className="editForm">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
                <button onClick={() => handleEdit(item.id)}>Kaydet</button>
                <button onClick={() => setEditId(null)}>İptal</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
