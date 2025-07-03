import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "react-switch";
import "./UpdatePage.scss";
import { IoIosInformationCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import categoryOfProduct from "../../../public/assets/category.jpg";
import productOfInfo from "../../../public/assets/productOfInfo.png";

function AddPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [typeAz, setTypeAz] = useState("");
  const [typeTr, setTypeTr] = useState("");
  const [typeEn, setTypeEn] = useState("");
  const [descAz, setDescAz] = useState("");
  const [descTr, setDescTr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [nameAz, setNameAz] = useState("");
  const [nameTr, setNameTr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [spec1Az, setSpec1Az] = useState("");
  const [spec1Tr, setSpec1Tr] = useState("");
  const [spec1En, setSpec1En] = useState("");
  const [spec2Az, setSpec2Az] = useState("");
  const [spec2Tr, setSpec2Tr] = useState("");
  const [spec2En, setSpec2En] = useState("");
  const [spec3Az, setSpec3Az] = useState("");
  const [spec3Tr, setSpec3Tr] = useState("");
  const [spec3En, setSpec3En] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [look, setLook] = useState(true);
  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [types, setTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://172.20.10.89:8000/api/packages/");
      console.log("Products fetched:", res.data);
      // Extract unique types from the fetched data
      const uniqueTypes = res.data.map(item => item.Type).filter((value, index, self) => 
        index === self.findIndex((t) => t.Az === value.Az)
      );
      setTypes(uniqueTypes);
      setFilteredTypes(uniqueTypes);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Məhsulları əldə etmək alınmadı!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTypeInputChange = (e, language) => {
    const value = e.target.value;
    if (language === 'Az') setTypeAz(value);
    if (language === 'Tr') setTypeTr(value);
    if (language === 'En') setTypeEn(value);

    // Filter types based on input
    const filtered = types.filter(type => 
      type.Az.toLowerCase().includes(value.toLowerCase()) ||
      type.Tr.toLowerCase().includes(value.toLowerCase()) ||
      type.En.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredTypes(filtered);
    setShowDropdown(value.length > 0);
  };

  const handleTypeSelect = (type) => {
    setTypeAz(type.Az);
    setTypeTr(type.Tr);
    setTypeEn(type.En);
    setShowDropdown(false);
  };

  const resetForm = () => {
    setSelectedCategory("All");
    setTypeAz("");
    setTypeTr("");
    setTypeEn("");
    setDescAz("");
    setDescTr("");
    setDescEn("");
    setNameAz("");
    setNameTr("");
    setNameEn("");
    setSpec1Az("");
    setSpec1Tr("");
    setSpec1En("");
    setSpec2Az("");
    setSpec2Tr("");
    setSpec2En("");
    setSpec3Az("");
    setSpec3Tr("");
    setSpec3En("");
    setPrice("");
    setImage(null);
    setLook(true);
    setVisible(true);
    setErrorMessage("");
    setShowDropdown(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !selectedCategory ||
      !typeAz ||
      !typeTr ||
      !typeEn ||
      !descAz ||
      !descTr ||
      !descEn ||
      !nameAz ||
      !nameTr ||
      !nameEn ||
      !spec1Az ||
      !spec1Tr ||
      !spec1En ||
      !spec2Az ||
      !spec2Tr ||
      !spec2En ||
      !spec3Az ||
      !spec3Tr ||
      !spec3En ||
      !image ||
      !price
    ) {
      setErrorMessage("Zəhmət olmasa bütün sahələri doldurun");
      toast.error("Zəhmət olmasa bütün sahələri doldurun!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setErrorMessage("");
    const formData = new FormData();
    formData.append("MainCategory", selectedCategory);
    const typeObj = { Az: typeAz, En: typeEn, Tr: typeTr };
    formData.append("Type", JSON.stringify(typeObj));
    const descObj = { Az: descAz, En: descEn, Tr: descTr };
    formData.append("Desc", JSON.stringify(descObj));
    const nameObj = { Az: nameAz, En: nameEn, Tr: nameTr };
    formData.append("Name", JSON.stringify(nameObj));
    const spec1Obj = { Az: spec1Az, En: spec1En, Tr: spec1Tr };
    formData.append("Spec1", JSON.stringify(spec1Obj));
    const spec2Obj = { Az: spec2Az, En: spec2En, Tr: spec2Tr };
    formData.append("Spec2", JSON.stringify(spec2Obj));
    const spec3Obj = { Az: spec3Az, En: spec3En, Tr: spec3Tr };
    formData.append("Spec3", JSON.stringify(spec3Obj));
    formData.append("Price", price);
    formData.append("Look", look);
    formData.append("Visible", visible);
    if (image) formData.append("Image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://172.20.10.89:8000/api/packages/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      resetForm();
      toast.success("Məhsul uğurla əlavə olundu!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData(); // Refresh types after successful submission
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      setErrorMessage("Məhsul əlavə edilərkən xəta baş verdi");
      toast.error("Məhsul əlavə edilərkən xəta baş verdi!", {
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
      <h2 className="title">Ərzaq Əlavə et</h2>
      <form className="update-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="category">
            Kateqoriya Seç
            <span className="info-icon" onClick={() => openImageModal(categoryOfProduct)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All" disabled>Hamısı</option>
            <option value="cleaning">Təmizlik</option>
            <option value="packaging">Paketləmə</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="typeAz">
            Növü (AZ)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            id="typeAz"
            value={typeAz}
            onChange={(e) => handleTypeInputChange(e, 'Az')}
            placeholder="Növünü daxil edin"
            
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
          <label htmlFor="typeTr">
            Növü (TR)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            id="typeTr"
            value={typeTr}
            onChange={(e) => handleTypeInputChange(e, 'Tr')}
            placeholder="Türünü girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeEn">
            Növü (EN)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            id="typeEn"
            value={typeEn}
            onChange={(e) => handleTypeInputChange(e, 'En')}
            placeholder="Enter type"
          />
        </div>
        <div className="form-group">
          <label>
            Adı (AZ)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            value={nameAz}
            onChange={(e) => setNameAz(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            Adı (TR)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            value={nameTr}
            onChange={(e) => setNameTr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            Adı (EN)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descAz">
            Açıqlama (AZ)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <textarea
            id="descAz"
            value={descAz}
            onChange={(e) => setDescAz(e.target.value)}
            placeholder="Ərzaq barədə açıqlama yazın"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descTr">
            Açıqlama (TR)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <textarea
            id="descTr"
            value={descTr}
            onChange={(e) => setDescTr(e.target.value)}
            placeholder="Açıklama girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descEn">
            Açıqlama (EN)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <textarea
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Enter description"
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
            value={spec1Az}
            onChange={(e) => setSpec1Az(e.target.value)}
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
            value={spec1Tr}
            onChange={(e) => setSpec1Tr(e.target.value)}
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
            value={spec1En}
            onChange={(e) => setSpec1En(e.target.value)}
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
            value={spec2Az}
            onChange={(e) => setSpec2Az(e.target.value)}
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
            value={spec2Tr}
            onChange={(e) => setSpec2Tr(e.target.value)}
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
            value={spec2En}
            onChange={(e) => setSpec2En(e.target.value)}
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
            value={spec3Az}
            onChange={(e) => setSpec3Az(e.target.value)}
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
            value={spec3Tr}
            onChange={(e) => setSpec3Tr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            Xüsusiyyət 3(EN)
            <span className="info-icon" onClick={() => openImageModal(productOfInfo)}>
              <i><IoIosInformationCircleOutline /></i>
            </span>
          </label>
          <input
            type="text"
            value={spec3En}
            onChange={(e) => setSpec3En(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Qiymət</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Məsələn: 5.90 AZN"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Şəkil</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
          {image && (
            <img
              alt="Food Preview"
              className="image-preview"
              src={URL.createObjectURL(image)}
            />
          )}
        </div>
        <div className="form-group toggle-group">
          <label htmlFor="look">Qiymət Görünməsi</label>
          <Switch
            onChange={(checked) => setLook(checked)}
            checked={look}
            onColor="#d10013"
            offColor="#ccc"
            handleDiameter={20}
            height={24}
            width={48}
            uncheckedIcon={false}
            checkedIcon={false}
            id="look"
          />
          <span className="toggle-label">{look ? "Görünən" : "Görünməyən"}</span>
        </div>
        <div className="form-group toggle-group">
          <label htmlFor="visible">Məhsul Görünməsi</label>
          <Switch
            onChange={(checked) => setVisible(checked)}
            checked={visible}
            onColor="#d10013"
            offColor="#ccc"
            handleDiameter={20}
            height={24}
            width={48}
            uncheckedIcon={false}
            checkedIcon={false}
            id="visible"
          />
          <span className="toggle-label">{visible ? "Görünən" : "Görünməyən"}</span>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className="submit-btn" type="submit">
          {loading ? <div className="loader"></div> : "Daxil et"}
        </button>
      </form>
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
      <ToastContainer />
    </div>
  );
}

export default AddPage;