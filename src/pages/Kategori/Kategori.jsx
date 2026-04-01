import React, { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";


const Kategori = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {search} = useOutletContext();

  useEffect(() => {
    getProductCategories();
  }, []);

  const getProductCategories = async () => {
    try {
      const result = await axios.get(`https://apiniaga.psjpetik.my.id/api/v1/jenis-produk`);
      // console.log(result.data.data);
      console.log(categories);

      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = categories.filter((category) => {
    return category.nama?.toLowerCase().includes(search.toLowerCase());
  });

  const ITEMS_PER_PAGE = 10;
  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar Kategori</h3>
        <NavLink to="/dashboard/kategori/add">Tambah Kategori</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((category, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{category.nama}</td>
                <td>
                  <img src={category.url} alt="gambar" width={120} />
                </td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PAGINATION */}
      {/* currentPage */}
      {/* totalPage */}
      {
        totalPage > 1 && (
          <div className="pagination">
            <button 
            className="btn-page" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p -1)}
              >&laquo; Prev
              </button>
            {
              Array.from({length: totalPage}).map((_, i) => (
                <button
                className="btn-page"
                disabled={currentPage === i + 1}
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))
            }
              <button 
              className="btn-page" 
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              >&raquo; Next
              </button>
          </div>
        )
      }
    </div>
  );
};

export default Kategori;
