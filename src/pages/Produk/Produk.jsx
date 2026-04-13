import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

const Product = () => {
  const [productes, setproductes] = useState([]);
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
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/produk`
      );

      setproductes(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = productes.filter((product) =>
    product.nama_barang?.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm(
      "Apakah anda yakin ingin menghapus product ini?"
    );
    if (!msg) return;

    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/produk/${uuid}`
      );
      getProductCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  const kategoriMap = {
    1: "Elektronik",
    2: "Furniture",
    3: "Makanan",
    4: "Minuman",
    5: "Komputer",
    6: "Alat Tulis",
    8: "Aksesoris",
  };

  return (
    <div>
      <div className="product-header">
        <h3>Daftar Product</h3>
        <NavLink to="/dashboard/product/add">Tambah Produk</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Stok</th>
              <th>Min Stok</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((product, index) => (
              <tr key={product.uuid}>
                <td>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>

                <td>{product.nama_barang}</td>
                <td>{product.stok}</td>
                <td>{product.min_stok}</td>
                <td>{formatRupiah(product.harga)}</td>

                <td>{kategoriMap[product.jenis_produk_id]}</td>

                <td>
                  {product.url ? (
                    <img src={product.url} alt="gambar" width={120} />
                  ) : (
                    <span>Tidak Ada Gambar</span>
                  )}
                </td>

                <td>
                  <NavLink
                    to={`/dashboard/produk/edit/${product.uuid}`}
                    className="btn-edit"
                  >
                    Edit
                  </NavLink>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product.uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &laquo; Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
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
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;