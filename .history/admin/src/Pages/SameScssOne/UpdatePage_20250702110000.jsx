import React, { useEffect, useState } from "react";
import "./UpdatePage.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosInformationCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import categoryOfProduct from "../../../public/assets/category.jpg";
import productOfInfo from "../../../public/assets/productOfInfo.png";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState({
    MainCategory: "",
    Type: { Az: "", Tr: "", En: "" },
    Desc: { Az: "", Tr: "", En: "" },
    Name: { Az: "", Tr: "", En: "" },
    Spec1: { Az: "", Tr: "", En: "" },
    Spec2: { Az: "", Tr: "", En: "" },
    Spec3: { Az: "", Tr: "", En: "" },
    Price: "",
    Look: true,
    Visible: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [load, setLoad] = useState(false);

  const fetchDetail = async () => {
    try {
      const res = await axios.get(`http://172.20.10.89:8000/api/packages/${id}`);
      const data = res.data;

      setFormData({
        MainCategory: data.MainCategory,
        Type: data.Type,
        Desc: data.Desc,
        Name: data.Name,
        Spec1: data.Spec1,
        Spec2: data.Spec2,
        Spec3: data.Spec3,
        Price: data.Price,
        Look: data.Look,
        Visible: data.Visible,
      });

      setImagePreview(data.image);
    } catch (err) {
      console.error("Məlumat gətirilərkən xəta:", err);
      toast.error("Məlumat gətirilərkən xəta baş verdi!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTypes = async () => {
    try {
      const res = await axios.get("http://172.20.10.89:8000/api/packages/");
      const uniqueTypes = res.data.map(item => item.Type).filter((value, index, self) => 
        index === self.findIndex((t) => t.Az === value.Az)
      );
      setTypes(uniqueTypes);
      setFilteredTypes(uniqueTypes);
    } catch (error) {
      console.error("Error fetching types:", error);
      toast.error("Növləri əldə etmək alınmadı!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchTypes();
  }, [id]);

  const handleInput = (group, lang, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [lang]: value,
      },
    }));

    if (group === 'Type') {
      const filtered = types.filter(type => 
        type.Az.toLowerCase().includes(value.toLowerCase()) ||
        type.Tr.toLowerCase().includes(value.toLowerCase()) ||
        type.En.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTypes(filtered);
      setShowDropdown(value.length > 0);
    }
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      Type: {
        Az: type.Az,
        Tr: type.Tr,
        En: type.En,
      },
    }));
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.MainCategory ||
      !formData.Type.Az ||
      !formData.Type.Tr ||
      !formData.Type.En ||
      !formData.Desc.Az ||
      !formData.Desc.Tr ||
      !formData.Desc.En ||
      !formData.Name.Az ||
      !formData.Name.Tr ||
      !formData.Name.En ||
      !formData.Price
    ) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoad(true);

      const payload = new FormData();
      payload.append("MainCategory", formData.MainCategory);
      payload.append("Type", JSON.stringify(formData.Type));
      payload.append("Desc", JSON.stringify(formData.Desc));
      payload.append("Name", JSON.stringify(formData.Name));
      payload.append("Spec1", JSON.stringify(formData.Spec1));
      payload.append("Spec2", JSON.stringify(formData.Spec2));
      payload.append("Spec3", JSON.stringify(formData.Spec3));
      payload.append("Price", formData.Price);
      payload.append("Look", formData.Look);
      payload.append("Visible", formData.Visible);

      if (imageFile) {
        payload.append("Image", imageFile);
      }

      await axios.put(`http://172.20.10.89:8000/api/packages/${id}/`, payload);

      setLoad(false);
      toast.success("Məhsul uğurla yeniləndi!", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/erzaq"), 3000);
    } catch (err) {
      console.error("Yeniləmə zamanı xəta:", err);
      setLoad(false);
      toast.error("Yeniləmə zamanı xəta baş verdi!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const openImageModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="update-page">
      <h2 className="title">Ərzağı Yenilə</h2>

      {loading ? (
        <div className="loading">Yüklənir...</div>
      ) : (
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Kateqoriya
              <span className="info-icon" onClick={() => openImageModal(categoryOfProduct)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <select
              value={formData.MainCategory}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  MainCategory: e.target.value,
                }))
              }
            >
              <option value="cleaning">Təmizlik</option>
              <option value="packaging">Paketləmə</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Növü (AZ)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Type.Az}
              onChange={(e) => handleInput('Type', 'Az', e.target.value)}
            />
            {showDropdown && filteredTypes.length > 0 && (
              <div className="type-dropdown">
                <ul>
                  {filteredTypes.map((type, index) => (
                    <li key={index} onClick={() => handleTypeSelect(type)}>
                      {type.Az}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              Növü (TR)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Type.Tr}
              onChange={(e) => handleInput('Type', 'Tr', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Növü (EN)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Type.En}
              onChange={(e) => handleInput('Type', 'En', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Name (AZ)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Name.Az}
              onChange={(e) => handleInput('Name', 'Az', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Name (TR)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Name.Tr}
              onChange={(e) => handleInput('Name', 'Tr', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Name (EN)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Name.En}
              onChange={(e) => handleInput('Name', 'En', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Desc (AZ)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <textarea
              value={formData.Desc.Az}
              onChange={(e) => handleInput('Desc', 'Az', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Desc (TR)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <textarea
              value={formData.Desc.Tr}
              onChange={(e) => handleInput('Desc', 'Tr', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Desc (EN)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <textarea
              value={formData.Desc.En}
              onChange={(e) => handleInput('Desc', 'En', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 1(AZ)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec1.Az}
              onChange={(e) => handleInput('Spec1', 'Az', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 1(TR)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec1.Tr}
              onChange={(e) => handleInput('Spec1', 'Tr', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 1(EN)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec1.En}
              onChange={(e) => handleInput('Spec1', 'En', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 2(AZ)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec2.Az}
              onChange={(e) => handleInput('Spec2', 'Az', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 2(TR)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec2.Tr}
              onChange={(e) => handleInput('Spec2', 'Tr', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 2(EN)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec2.En}
              onChange={(e) => handleInput('Spec2', 'En', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 3(AZ)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec3.Az}
              onChange={(e) => handleInput('Spec3', 'Az', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Xüsusiyyət 3(TR)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec3.Tr}
              onChange={(e) => handleInput('Spec3', 'Tr', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              Spec3 (EN)
              <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
                <i><IoIosInformationCircleOutline /></i>
              </span>
            </label>
            <input
              type="text"
              value={formData.Spec3.En}
              onChange={(e) => handleInput('Spec3', 'En', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Qiymət</label>
            <input
              type="text"
              value={formData.Price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  Price: e.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <label>Qiymət Görünməsi</label>
            <select
              value={formData.Look ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  Look: e.target.value === "true",
                }))
              }
            >
              <option value="true">Görünsün</option>
              <option value="false">Görünməsin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Məhsul Görünməsi</label>
            <select
              value={formData.Visible ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  Visible: e.target.value === "true",
                }))
              }
            >
              <option value="true">Görünsün</option>
              <option value="false">Görünməsin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Şəkil Yüklə</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Önizlə886mə"
                className="image-preview"
              />
            )}
          </div>

          <button type="submit" className="submit-btn">
            {load ? <div className="loader"></div> : "Yadda saxla"}
          </button>
        </form>
      )}

      {modalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={closeImageModal}>
              <IoIosCloseCircleOutline />
            </span>
            <img src={modalImage} alt="Info" />
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UpdatePage;