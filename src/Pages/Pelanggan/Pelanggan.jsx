import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext } from "react-router-dom";

const Pelanggan = () => {
  // setcategories digunakan untuk menyimpan data api
  const [pelanggan, setPelanggan] = useState([]);
  const [categories, setCategories] = useState([]);
  // membuat pagination pakai currentpage
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  // jalanin getPelanggan pakai useEffect
  useEffect(() => {
    getPelanggan();
    getPelangganCategories();
  }, []);

  const getPelanggan = async () => {
    try {
      const result = await axios.get(`
        https://apiniaga.psjpetik.my.id/api/v1/pelanggan`);
      //   console.log(result.data.data);
      console.log(pelanggan);
      setPelanggan(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPelangganCategories = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`
        ${import.meta.env.VITE_API_URL}/pelanggan`);
      //   console.log(result.data.data);
      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const filteredData = pelanggan.filter((pelanggan) => {
    return pelanggan.nama.toLowerCase().includes(search.toLowerCase());
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/pelanggan/${uuid}`);
      getPelanggan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar Pelanggan</h3>
        <NavLink to="/dashboard/pelanggan/add">Tambah Pelanggan</NavLink>
      </div>
      <div className="table-wrapper">
        <table className="pelanggan-table" border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gender</th>
              <th>No Hp</th>
              <th>Alamat</th>
              <th>Tanggal/Lahir</th>
              <th>Kartu</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((pelanggan, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{pelanggan.nama}</td>
                <td>{pelanggan.gender}</td>
                <td>{pelanggan.no_hp}</td>
                <td>{pelanggan.alamat}</td>
                <td>{pelanggan.tgl_lahir}</td>
                <td>{pelanggan.kartu_id}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(pelanggan.uuid)}>
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

export default Pelanggan;
