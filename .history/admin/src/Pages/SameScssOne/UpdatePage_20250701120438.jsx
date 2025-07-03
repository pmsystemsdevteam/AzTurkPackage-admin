import React, { useEffect, useState } from "react";
import "./UpdatePage.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://172.20.10.89:8000/api/packages/${id}`
        );
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
        // toast.info("Məlumat uğurla yükləndi!", {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
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

    fetchDetail();
  }, [id]);

  const handleInput = (group, lang, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [lang]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
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
      setTimeout(() => navigate("/erzaq"), 3000); // Delay navigation
    } catch (err) {
      console.error("Yeniləmə zamanı xəta:", err);
      setLoad(false);
      toast.error("Yeniləmə zamanı xəta baş verdi!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="update-page">
      <h2 className="title">Ərzağı Yenilə</h2>

     

      {loading ? (
        <div className="loading">Yüklənir...</div>
      ) : (
        <form className="update-form" onSubmit={handleSubmit}>
          {/* Kateqoriya */}
          <div className="form-group">
            <label>Kateqoriya</label>
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

          {/* Dinamik Dəyişənlər */}
          {["Type", "Desc", "Name", "Spec1", "Spec2", "Spec3"].map((field) =>
            ["Az", "Tr", "En"].map((lang) => (
              <div className="form-group" key={`${field}-${lang}`}>
                <label>{`${field} (${lang})`}</label>
                {field === "Desc" ? (
                  <textarea
                    value={formData[field][lang]}
                    onChange={(e) => handleInput(field, lang, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field][lang]}
                    onChange={(e) => handleInput(field, lang, e.target.value)}
                  />
                )}
              </div>
            ))
          )}

          {/* Qiymət */}
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

          {/* Qiymət Görünmə */}
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

          {/* Mahsul Görünmə */}
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

          {/* Şəkil */}
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
                alt="Önizləmə"
                className="image-preview"
              />
            )}
          </div>

          <button type="submit" className="submit-btn">
            {load ? <div className="loader"></div> : "Yadda saxla"}
          </button>
        </form>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default UpdatePage;