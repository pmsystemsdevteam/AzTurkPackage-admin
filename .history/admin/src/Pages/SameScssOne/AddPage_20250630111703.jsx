import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdatePage.scss";

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
  const [laoding, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch products to pre-fill the form if needed
  const fetchData = async () => {
    try {
      const res = await axios.get("http://172.20.10.86:8000/api/packages/");
      console.log("Products fetched:", res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    setErrorMessage("");
  };

  // Handle the form submit
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
      return;
    }

    setErrorMessage("");
    const formData = new FormData();

    // Flattening the data for each language field
    formData.append("MainCategory", selectedCategory);

    // Type (each language)
    const typeObj = { Az: typeAz, En: typeEn, Tr: typeTr };
    formData.append("Type", JSON.stringify(typeObj));

    // Description (each language)
    const descObj = { Az: descAz, En: descEn, Tr: descTr };
    formData.append("Desc", JSON.stringify(descObj));

    // Name (each language)
    const nameObj = { Az: nameAz, En: nameEn, Tr: nameTr };
    formData.append("Name", JSON.stringify(nameObj));

    // Spec1 (each language)
    const spec1Obj = { Az: spec1Az, En: spec1En, Tr: spec1Tr };
    formData.append("Spec1", JSON.stringify(spec1Obj));

    // Spec2 (each language)
    const spec2Obj = { Az: spec2Az, En: spec2En, Tr: spec2Tr };
    formData.append("Spec2", JSON.stringify(spec2Obj));

    // Spec3 (each language)
    const spec3Obj = { Az: spec3Az, En: spec3En, Tr: spec3Tr };
    formData.append("Spec3", JSON.stringify(spec3Obj));

    // Price
    formData.append("Price", price);

    // Image (if selected)
    if (image) formData.append("Image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://172.20.10.200:8000/api/packages/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="update-page">
      <h2 className="title">Ərzaq Əlavə et</h2>
      <form className="update-form" onSubmit={handleFormSubmit}>
        {/* Kateqoriya Seçimi */}
        <div className="form-group">
          <label htmlFor="category">Kateqoriya Seç</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All" disabled>
              Hamısı
            </option>
            <option value="cleaning">Təmizlik</option>
            <option value="packaging">Paketləmə</option>
          </select>
        </div>

        {/* Növü */}
        <div className="form-group">
          <label htmlFor="typeAz">Növü (AZ)</label>
          <input
            type="text"
            id="typeAz"
            value={typeAz}
            onChange={(e) => setTypeAz(e.target.value)}
            placeholder="Növünü daxil edin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeTr">Növü (TR)</label>
          <input
            type="text"
            id="typeTr"
            value={typeTr}
            onChange={(e) => setTypeTr(e.target.value)}
            placeholder="Türünü girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeEn">Növü (EN)</label>
          <input
            type="text"
            id="typeEn"
            value={typeEn}
            onChange={(e) => setTypeEn(e.target.value)}
            placeholder="Enter type"
          />
        </div>

        {/* Açıqlama */}
        <div className="form-group">
          <label htmlFor="descAz">Açıqlama (AZ)</label>
          <textarea
            id="descAz"
            value={descAz}
            onChange={(e) => setDescAz(e.target.value)}
            placeholder="Ərzaq barədə açıqlama yazın"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descTr">Açıqlama (TR)</label>
          <textarea
            id="descTr"
            value={descTr}
            onChange={(e) => setDescTr(e.target.value)}
            placeholder="Açıklama girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descEn">Açıqlama (EN)</label>
          <textarea
            id="descEn"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            placeholder="Enter description"
          />
        </div>

        {/* Name */}
        <div className="form-group">
          <label>Name (AZ)</label>
          <input
            type="text"
            value={nameAz}
            onChange={(e) => setNameAz(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Name (TR)</label>
          <input
            type="text"
            value={nameTr}
            onChange={(e) => setNameTr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Name (EN)</label>
          <input
            type="text"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>

        {/* Spec1, Spec2, Spec3 */}
        <div className="form-group">
          <label>Spec1 (AZ)</label>
          <input
            type="text"
            value={spec1Az}
            onChange={(e) => setSpec1Az(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Spec1 (TR)</label>
          <input
            type="text"
            value={spec1Tr}
            onChange={(e) => setSpec1Tr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Spec1 (EN)</label>
          <input
            type="text"
            value={spec1En}
            onChange={(e) => setSpec1En(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Spec2 (AZ)</label>
          <input
            type="text"
            value={spec2Az}
            onChange={(e) => setSpec2Az(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Spec2 (TR)</label>
          <input
            type="text"
            value={spec2Tr}
            onChange={(e) => setSpec2Tr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Spec2 (EN)</label>
          <input
            type="text"
            value={spec2En}
            onChange={(e) => setSpec2En(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Spec3 (AZ)</label>
          <input
            type="text"
            value={spec3Az}
            onChange={(e) => setSpec3Az(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Spec3 (TR)</label>
          <input
            type="text"
            value={spec3Tr}
            onChange={(e) => setSpec3Tr(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Spec3 (EN)</label>
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
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button className="submit-btn" type="submit">
          {laoding ? <div class="loader"></div> : "Daxil et"}
        </button>
      </form>
    </div>
  );
}

export default AddPage;
