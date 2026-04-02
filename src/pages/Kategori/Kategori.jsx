import React, { useState, useEffect } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import axios from "axios";

const Kategori = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();

  useEffect(() => {
    getProductCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getProductCategories = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/jenis-produk`
      );
      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm("Yakin hapus?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/jenis-produk/${uuid}`
      );
      getProductCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = categories.filter((item) =>
    item.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar Kategori</h3>
        <NavLink className="btn-add" to="/dashboard/kategori/add">
          Tambah Kategori
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.uuid}>
                <td>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td>{item.nama}</td>
                <td>
                  <img src={item.url} width={100} />
                </td>
                <td>
                  <button className="btn-edit">Edit</button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(item.uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPage > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              key={i}
              className="btn-page"
              disabled={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn-page"
            disabled={currentPage === totalPage}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Kategori;