import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./FoodPage.scss";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import axios from "axios";
import {
  IoIosInformationCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import categoryOfProduct from "../../../public/assets/category.jpg";
import productOfInfo from "../../../public/assets/productOfInfo.png";
import * as XLSX from "xlsx";

function FoodPage() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://172.20.10.60:8000/api/packages/");
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://172.20.10.60:8000/api/packages/${deleteId}/`);
      setProduct((prev) => prev.filter((food) => food.id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openModal = (id) => setDeleteId(id);
  const closeModal = () => setDeleteId(null);

  const handleEdit = (id) => navigate(`/erzaq/edit/${id}`);
  const handleAddFood = () => navigate("/erzaq/add");

  const openImageModal = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
    setModalImage("");
  };

  const filteredFoods = product
    .filter((item) =>
      selectedCategory === "All"
        ? true
        : item?.MainCategory === selectedCategory
    )
    .filter((item) =>
      item.Type?.Az.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "az") {
        return a.Type?.Az.localeCompare(b.Type?.Az);
      } else if (sortOrder === "za") {
        return b.Type?.Az.localeCompare(a.Type?.Az);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = filteredFoods.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

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

  const downloadExcel = () => {
    const data = filteredFoods.map((item, index) => ({
      "#": item.Sales ? "Kompanya" : startIndex + index + 1,
      Kateqoriya: item.MainCategory === "cleaning" ? "Təmizlik" : "Paketləmə",
      "Adı (AZ)": item.Name?.Az || "",
      "Adı (TR)": item.Name?.Tr || "",
      "Adı (EN)": item.Name?.En || "",
      "Növü (AZ)": item.Type?.Az || "",
      "Növü (TR)": item.Type?.Tr || "",
      "Növü (EN)": item.Type?.En || "",
      "Açıqlama (AZ)": item.Desc?.Az || "",
      "Açıqlama (TR)": item.Desc?.Tr || "",
      "Açıqlama (EN)": item.Desc?.En || "",
      "Xüsusiyyət 1 (AZ)": item.Spec1?.Az || "",
      "Xüsusiyyət 1 (TR)": item.Spec1?.Tr || "",
      "Xüsusiyyət 1 (EN)": item.Spec1?.En || "",
      "Xüsusiyyət 2 (AZ)": item.Spec2?.Az || "",
      "Xüsusiyyət 2 (TR)": item.Spec2?.Tr || "",
      "Xüsusiyyət 2 (EN)": item.Spec2?.En || "",
      "Xüsusiyyət 3 (AZ)": item.Spec3?.Az || "",
      "Xüsusiyyət 3 (TR)": item.Spec3?.Tr || "",
      "Xüsusiyyət 3 (EN)": item.Spec3?.En || "",
      Qiymət: `${item.Price} ₼` || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
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

        <div className="search-filter">
          <input
            type="text"
            placeholder="Məhsul axtar (AZ)..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="sort-filter">
          <select id="sort" value={sortOrder} onChange={handleSortChange}>
            <option value="none">Sıralama</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        <div className="add-food-button">
          <button onClick={handleAddFood}>Yeni Məhsul Əlavə Et</button>
          <button
            onClick={downloadExcel}
            style={{ marginLeft: "10px", backgroundColor: "#4caf50" }}
          >
            Excel olaraq yüklə
          </button>
        </div>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>#</th>
            <th>
              Kateqoriya
              <span
                className="info-icon"
                onClick={() => openImageModal(categoryOfProduct)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Adı (AZ)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Adı (TR)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Adı (EN)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Növü (AZ)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Növü (TR)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Növü (EN)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Açıqlama (AZ)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Açıqlama (TR)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Açıqlama (EN)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 1(AZ)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 1(TR)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 1(EN)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 2(AZ)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 2(TR)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 2(EN)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 3(AZ)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 3(TR)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>
              Xüsusiyyət 3(EN)
              <span
                className="info-icon"
                onClick={() => openImageModal(productOfInfo)}
              >
                <i>
                  <IoIosInformationCircleOutline />
                </i>
              </span>
            </th>
            <th>Şəkil</th>
            <th>Qiymət</th>
            <th>Yenilə</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {currentFoods.map((item, index) => (
            <tr key={item.id} className={item.Visible ? "" : "not-visible-row"}>
              <td>
                {item.Sales ? (
                  <div className="sales">Kompanya</div>
                ) : (
                  startIndex + index + 1
                )}
              </td>
              <td>
                {item.MainCategory === "cleaning" ? "Təmizlik" : "Paketləmə"}
              </td>
              <td>{item.Name?.Az}</td>
              <td>{item.Name?.Tr}</td>
              <td>{item.Name?.En}</td>
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
                <img src={item.image_url} alt={item.Type?.Az} />
              </td>
              <td>{item.Price} ₼</td>
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
    </div>
  );
}

export default FoodPage;