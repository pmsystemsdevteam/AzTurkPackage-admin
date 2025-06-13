import React from "react";
import "./UpdatePage.scss";

function UpdatePage() {
  return (
    <div className="update-page">
      <h2 className="title">Ərzaq Yenilə</h2>
      <form className="update-form">
        {/* Kateqoriya seçimi */}
        <div className="form-group">
          <label htmlFor="category">Kateqoriya Seç</label>
          <select id="category" name="category">
            <option value="All">Hamısı</option>
            <option value="Təmizlik">Təmizlik</option>
            <option value="Paketləmə">Paketləmə</option>
          </select>
        </div>

        {/* Növü */}
        <div className="form-group">
          <label htmlFor="typeAz">Növü (AZ)</label>
          <input
            type="text"
            id="typeAz"
            name="type.az"
            placeholder="Növünü daxil edin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeTr">Növü (TR)</label>
          <input
            type="text"
            id="typeTr"
            name="type.tr"
            placeholder="Türünü girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="typeEn">Növü (EN)</label>
          <input
            type="text"
            id="typeEn"
            name="type.en"
            placeholder="Enter type"
          />
        </div>

        {/* Açıqlama */}
        <div className="form-group">
          <label htmlFor="descAz">Açıqlama (AZ)</label>
          <textarea
            id="descAz"
            name="desc.az"
            placeholder="Ərzaq barədə açıqlama yazın"
          />
        </div>
        <div className="form-group">
          <label htmlFor="descTr">Açıqlama (TR)</label>
          <textarea id="descTr" name="desc.tr" placeholder="Açıklama girin" />
        </div>
        <div className="form-group">
          <label htmlFor="descEn">Açıqlama (EN)</label>
          <textarea
            id="descEn"
            name="desc.en"
            placeholder="Enter description"
          />
        </div>

        {/* Text1 */}
        <div className="form-group">
          <label>Text1 adı (AZ)</label>
          <input type="text" name="text1.az" placeholder="Text1 (AZ)" />
        </div>
        <div className="form-group">
          <label>Text1 adı (TR)</label>
          <input type="text" name="text1.tr" placeholder="Text1 (TR)" />
        </div>
        <div className="form-group">
          <label>Text1 adı (EN)</label>
          <input type="text" name="text1.en" placeholder="Text1 (EN)" />
        </div>

        {/* Text2 */}
        <div className="form-group">
          <label>Text2 adı (AZ)</label>
          <input type="text" name="text2.az" placeholder="Text2 (AZ)" />
        </div>
        <div className="form-group">
          <label>Text2 adı (TR)</label>
          <input type="text" name="text2.tr" placeholder="Text2 (TR)" />
        </div>
        <div className="form-group">
          <label>Text2 adı (EN)</label>
          <input type="text" name="text2.en" placeholder="Text2 (EN)" />
        </div>

        {/* Text3 */}
        <div className="form-group">
          <label>Text3 adı (AZ)</label>
          <input type="text" name="text3.az" placeholder="Text3 (AZ)" />
        </div>
        <div className="form-group">
          <label>Text3 adı (TR)</label>
          <input type="text" name="text3.tr" placeholder="Text3 (TR)" />
        </div>
        <div className="form-group">
          <label>Text3 adı (EN)</label>
          <input type="text" name="text3.en" placeholder="Text3 (EN)" />
        </div>

        {/* Qiymət */}
        <div className="form-group">
          <label htmlFor="price">Qiymət</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Məsələn: 5.90 AZN"
          />
        </div>

        {/* Şəkil */}
        <div className="form-group">
          <label htmlFor="image">Şəkil</label>
          <input type="file" id="image" name="image" accept="image/*" />
          <img alt="Food Preview" className="image-preview" />
        </div>

        <button className="submit-btn" type="submit">
          Yenilə
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;
