import axiosIntance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

const Kartu = () => {
  const [kartus, setKartus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();

  useEffect(() => {
    getKartuCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getKartuCategories = async () => {
    try {
      const result = await axiosIntance.get(
        `${import.meta.env.VITE_API_URL}/kartu`
      );

      console.log(result.data.data);
      setKartus(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = kartus.filter((kartu) =>
    kartu.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm(
      "Apakah anda yakin ingin menghapus kartu ini?"
    );
    if (!confirmDelete) return;

    try {
      await axiosIntance.delete(
        `${import.meta.env.VITE_API_URL}/kartu/${uuid}`
      );
      getKartuCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="kartu-header">
        <h3>Daftar Kartu</h3>
        <NavLink to="/dashboard/kartu/add">Tambah Kartu</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode</th>
              <th>Nama</th>
              <th>Diskon</th>
              <th>Iuran</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((kartu, index) => (
              <tr key={kartu.uuid}>
                <td>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>
                <td>{kartu.kode}</td>
                <td>{kartu.nama}</td>
                <td>{kartu.diskon}</td>
                <td>{kartu.iuran}</td>

                <td>
                  <NavLink
                    to={`/dashboard/kartu/edit/${kartu.uuid}`}
                    className="btn-edit"
                  >
                    Edit
                  </NavLink>

                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(kartu.uuid)}
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

export default Kartu;