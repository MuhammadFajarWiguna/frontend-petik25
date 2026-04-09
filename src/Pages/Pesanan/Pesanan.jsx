import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext } from "react-router-dom";

const Pesanan = () => {
  // setcategories digunakan untuk menyimpan data api
  const [pesanan, setPesanan] = useState([]);
  const [categories, setCategories] = useState([]);
  // membuat pagination pakai currentpage
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  // jalanin getPesanan pakai useEffect
  useEffect(() => {
    getPesanan();
    getPesananCategories();
  }, []);

  const getPesanan = async () => {
    try {
      const result = await axios.get(`
        https://apiniaga.psjpetik.my.id/api/v1/pesanan`);
      //   console.log(result.data.data);
      console.log(pesanan);
      setPesanan(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPesananCategories = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`
        ${import.meta.env.VITE_API_URL}/pesanan`);
      //   console.log(result.data.data);
      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const filteredData = pesanan.filter((pesanan) => {
    return pesanan.pelanggan.nama.toLowerCase().includes(search.toLowerCase());
  });

  const ITEMS_PER_PAGE = 5;

  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // buat membatasi di 1 halaman ada berapa data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin nak hapus ni?");

    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/pesanan/${uuid}`);
      getPesanan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar pesanan</h3>
        <NavLink to="/dashboard/pesanan/add">Tambah pesanan</NavLink>
      </div>
      <div className="table-wrapper">
        <table className="pesanan-table" border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Nama Pelanggan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((pesanan, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{pesanan.tanggal}</td>
                <td>{pesanan.total.toLocaleString("id-ID")}</td>
                <td>{pesanan.pelanggan.nama}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(pesanan.uuid)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPage > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &laquo; Prev
          </button>
          {Array.from({ length: totalPage }).map((_, i) => (
            <button
              className="btn-page"
              disabled={currentPage === i + 1}
              key={i}
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
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pesanan;
