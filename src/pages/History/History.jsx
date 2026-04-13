import React, { useState, useEffect } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getHistory = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/history`);
      setHistory(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (uuid) => {
    const confirmDelete = window.confirm("Yakin hapus?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/history/${uuid}`);
      getHistory();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = history.filter((item) => item.user?.username?.toLowerCase().includes(search.toLowerCase()));

  const ITEMS_PER_PAGE = 10;
  const totalPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div>
      <div className="pesanan-header">
        <h3>Daftar History</h3>
        <NavLink className="btn-add" to="/dashboard/pesanan/add">
          Tambah History
        </NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>User</th>
              <th>Action</th>
              <th>Table</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.uuid}>
                <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td>{new Date(item.createdAt).toLocaleString("id-ID")}</td>

                <td>{item.user?.username}</td>

                <td>{item.action}</td>

                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPage > 1 && (
        <div className="pagination">
          <button className="btn-page" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Prev
          </button>

          {Array.from({ length: totalPage }).map((_, i) => (
            <button key={i} className="btn-page" disabled={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}

          <button className="btn-page" disabled={currentPage === totalPage} onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
