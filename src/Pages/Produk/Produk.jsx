import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import axios from "axios";
import Card from "../../Components/Card/Card";

const Produk = () => {
  // kalo nilainya berupa array/objek maka disesuaikan
  const [product, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/produk`);
      console.log(product);
      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = product.filter((product) => {
    return product.nama_barang?.toLowerCase().includes(search.toLowerCase());
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // rumus
  // slice(mulai,selesai)

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin ingin menghapus");
    if (!msg) return;
    console.log(uuid);

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/produk/${uuid}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="product-header">
        <h3>Daftar Product</h3>
        <NavLink to="/dashboard/product/add">Tambah Product</NavLink>
      </div>

      {/* <Card>
        <h3>Ini Judul Card</h3>
        <p>Ini konten Card</p>
      </Card> */}

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
                  <button onClick={() => handleDelete(category.uuid)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="btn-page" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            &laquo; Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button className="btn-page" disabled={currentPage === i + 1} key={i} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className="btn-page" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Produk;
