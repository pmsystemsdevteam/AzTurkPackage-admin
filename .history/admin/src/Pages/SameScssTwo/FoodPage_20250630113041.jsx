import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FoodPage.scss";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import axios from "axios";

function FoodPage() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const itemsPerPage = 10;

  // API çağırışını həyata keçiririk
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://172.20.10.86:8000/api/packages/");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // Məhsul silinməsi (server + lokal)
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://172.20.10.86:8000/api/packages/${deleteId}/`
      );
      setProduct((prev) => prev.filter((food) => food.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openModal = (id) => setDeleteId(id);
  const closeModal = () => setDeleteId(null);

  // Redaktə funksiyası
  const handleEdit = (id) => navigate(`/erzaq/edit/${id}`);
  const handleAddFood = () => navigate("/erzaq/add");

  // Filtrlənmiş məhsullar
  const filteredFoods =
    selectedCategory === "All"
      ? product
      : product.filter((item) => item?.MainCategory === selectedCategory);

  // Səhifələmə logikası
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = filteredFoods.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Filtr parametrləri dəyişdikdə səhifəni 1-ə sıfırlamaq
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  // Pagination düymələrinin renderi
  const renderPaginationButtons = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((page) => {
        if (totalPages <= 5) return true;
        if (currentPage <= 3) return page <= 5;
        if (currentPage >= totalPages - 2) return page >= totalPages - 4;
        return Math.abs(page - currentPage) <= 2;
      })
      .map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ));
  };

  return (
    <div className="food-page">
      <h2 className="title">Məhsul Siyahısı</h2>

      <div className="header-row">
        <div className="category-filter">
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">Hamısı</option>
            <option value="cleaning">Təmizlik</option>
            <option value="packaging">Paketləmə</option>
          </select>
        </div>

        <div className="add-food-button">
          <button onClick={handleAddFood}>Yeni Məhsul Əlavə Et</button>
        </div>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Kateqoriya</th>
            <th>Növü (AZ)</th>
            <th>Növü (TR)</th>
            <th>Növü (EN)</th>
            <th>Açıqlama (AZ)</th>
            <th>Açıqlama (TR)</th>
            <th>Açıqlama (EN)</th>
            <th>Text1 adı (AZ)</th>
            <th>Text1 adı (TR)</th>
            <th>Text1 adı (EN)</th>
            <th>Text2 adı (AZ)</th>
            <th>Text2 adı (TR)</th>
            <th>Text2 adı (EN)</th>
            <th>Text3 adı (AZ)</th>
            <th>Text3 adı (TR)</th>
            <th>Text3 adı (EN)</th>
            <th>Şəkil</th>
            <th>Qiymət</th>
            <th>Qiymət Görünməsi</th>
            <th>Məhsul Görünməsi</th>
            <th>Yenilə</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {currentFoods.map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td>
                {item.MainCategory === "cleaning" ? "Təmizlik" : "Paketləmə"}
              </td>
              <td>{item.Type?.Az}</td>
              <td>{item.Type?.Tr}</td>
              <td>{item.Type?.En}</td>
              <td>{item.Desc?.Az}</td>
              <td>{item.Desc?.Tr}</td>
              <td>{item.Desc?.En}</td>
              <td>{item.Spec1?.Az}</td>
              <td>{item.Spec1?.Tr}</td>
              <td>{item.Spec1?.En}</td>
              <td>{item.Spec2?.Az}</td>
              <td>{item.Spec2?.Tr}</td>
              <td>{item.Spec2?.En}</td>
              <td>{item.Spec3?.Az}</td>
              <td>{item.Spec3?.Tr}</td>
              <td>{item.Spec3?.En}</td>
              <td>
                <img src={item.image_url} alt={item.Name?.Az} />
              </td>
              <td>{item.Price} ₼</td>
              <td>{item.Look ? "Görünən" : "Görünməyən"}</td>
              <td>{item.Visible ? "Görünən" : "Görünməyən"}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(item.id)}>
                  Yenilə
                </button>
              </td>
              <td>
                <button className="delete" onClick={() => openModal(item.id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>

      <DeleteModal
 isOpen={deleteId !== null}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
}

export  FoodPage;