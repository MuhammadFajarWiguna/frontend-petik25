import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useOutletContext } from "react-router-dom";

const Produk = () => {
  // setcategories digunakan untuk menyimpan data api
  const [produk, setProduk] = useState([]);
  const [categories, setCategories] = useState([]);
  // membuat pagination pakai currentpage
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  // jalanin getProduct pakai useEffect
  useEffect(() => {
    getProduct();
    getProductCategories();
  }, []);

  const getProduct = async () => {
    try {
      const result = await axios.get(`
        https://apiniaga.psjpetik.my.id/api/v1/produk`);
      //   console.log(result.data.data);
      console.log(produk);
      setProduk(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductCategories = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`
        ${import.meta.env.VITE_API_URL}/jenis-produk`);
      //   console.log(result.data.data);
      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const categoryName = (jenis_produk_id) => {
    const category = categories.find((c) => c.id === jenis_produk_id);

    return category ? category.nama : "-";
  };

  const filteredData = produk.filter((produk) => {
    return produk.nama_barang?.toLowerCase().includes(search.toLowerCase());
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
      await axios.delete(`${import.meta.env.VITE_API_URL}/produk/${uuid}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar Produk</h3>
        <NavLink to="/dashboard/produk/add">Tambah Produk</NavLink>
      </div>
      <div className="table-wrapper">
        <table className="produk-table" border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Min Stok</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((produk, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{produk.nama_barang}</td>
                <td>{produk.min_stok}</td>
                <td>Rp {produk.harga.toLocaleString("id-ID")}</td>
                <td>{categoryName(produk.jenis_produk_id)}</td>
                <td>
                  <img src={produk.url} alt="gambar" width={120} />
                </td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => handleDelete(produk.uuid)}>
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

export default Produk;
