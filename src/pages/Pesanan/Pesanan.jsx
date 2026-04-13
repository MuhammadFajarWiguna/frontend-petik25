import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

const Pesanan = () => {
  const [pesanans, setPesanans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();

  useEffect(() => {
    getPesananCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getPesananCategories = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/pesanan`
      );

      console.log(result.data.data);
      setPesanans(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = pesanans.filter((pesanan) =>
    pesanan.pelanggan.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm(
      "Apakah anda yakin ingin menghapus pesanan ini?"
    );
    if (!msg) return;

    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/pesanan/${uuid}`
      );
      getPesananCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="pesanan-header">
        <h3>Daftar Pesanan</h3>
        <NavLink to="/dashboard/pesanan/add">Tambah Pesanan</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Pelanggan ID</th>
              <th>Pelanggan</th>
              <th>No HP</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((pesanan, index) => (
              <tr key={pesanan.uuid}>
                <td>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>

                <td>{pesanan.tanggal}</td>
                <td>{pesanan.total}</td>
                <td>{pesanan.pelanggan_id}</td>
                <td>{pesanan.pelanggan.nama}</td>
                <td>{pesanan.pelanggan.no_hp}</td>

                <td>
                  <NavLink
                    to={`/dashboard/pesanan/edit/${pesanan.uuid}`}
                    className="btn-edit"
                  >
                    Edit
                  </NavLink>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(pesanan.uuid)}
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

export default Pesanan;