import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink, useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Pelanggan = () => {

  const [pelanggan, setPelanggan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useOutletContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPelanggan();
  }, []);

  const getPelanggan = async () => {
    setLoading(true);

    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/pelanggan`
      );

      setPelanggan(result.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = pelanggan.filter((p) =>
    p.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Yakin nak hapus ni?");
    if (!msg) return;

    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/pelanggan/${uuid}`
      );

      getPelanggan();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="pelanggan-header">
        <h3>Daftar pelanggan</h3>
        <NavLink to="/dashboard/pelanggan/add">Tambah pelanggan</NavLink>
      </div>

      <div className="table-wrapper">
        <table className="pelanggan-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gender</th>
              <th>Tanggal Lahir</th>
              <th>No Hp</th>
              <th>Alamat</th>
              <th>Kartu</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j}>
                        <Skeleton height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              : paginatedData.map((p, index) => (
                  <tr key={p.uuid}>
                    <td>
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>

                    <td>{p.nama}</td>
                    <td>{p.gender}</td>
                    <td>{p.tgl_lahir}</td>
                    <td>{p.no_hp}</td>
                    <td>{p.alamat}</td>
                    <td>{p.kartu_id}</td>

                    <td className="aksi-cell">

                      <NavLink
                        to={`/dashboard/pelanggan/edit/${p.uuid}`}
                        className="btn-edit"
                      >
                        Edit
                      </NavLink>

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p.uuid)}
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