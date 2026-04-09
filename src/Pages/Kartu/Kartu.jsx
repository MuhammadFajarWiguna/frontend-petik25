import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext } from "react-router-dom";

const Kartu = () => {
  // setcategories digunakan untuk menyimpan data api
  const [kartu, setKartu] = useState([]);
  const [categories, setCategories] = useState([]);
  // membuat pagination pakai currentpage
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  // jalanin getProduct pakai useEffect
  useEffect(() => {
    getKartu();
  }, []);

  const getKartu = async () => {
    try {
      const result = await axios.get(`
        https://apiniaga.psjpetik.my.id/api/v1/kartu`);
      //   console.log(result.data.data);
      console.log(kartu);
      setKartu(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const filteredData = kartu.filter((kartu) => {
    return kartu.nama?.toLowerCase().includes(search.toLowerCase());
  });

  const ITEMS_PER_PAGE = 5;

  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // buat membatasi di 1 halaman ada berapa data
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus data ini?");

    if (!msg) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/kartu/${uuid}`);
      getKartu();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar Kartu</h3>
        <NavLink to="/dashboard/kartu/add">Tambah Kartu</NavLink>
      </div>
      <div className="table-wrapper">
        <table className="kartu-table" border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kode</th>
              <th>Diskon</th>
              <th>Iuran</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((kartu, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{kartu.nama}</td>
                <td>{kartu.kode}</td>
                <td>{kartu.diskon}%</td>
                <td>Rp. {kartu.iuran.toLocaleString("id-ID")}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(kartu.uuid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPage > 1 && (
        <div className="pagination">
          <button className="btn-page" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            &laquo; Prev
          </button>
          {Array.from({ length: totalPage }).map((_, i) => (
            <button className="btn-page" disabled={currentPage === i + 1} key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button className="btn-page" disabled={currentPage === totalPage} onClick={() => setCurrentPage((p) => p + 1)}>
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Kartu;
